import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';
import { Readable } from 'stream';
import { text } from 'stream/consumers';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  // CREATE
  async create(createPostDto: CreatePostDto, imageFile: Express.Multer.File): Promise<Post> {
    const user = await this.userService.findOneById(createPostDto.userId.toString());
    if (!user) {
      throw new NotFoundException(`User with ID ${createPostDto.userId} not found`);
    }

    let imagePath: string = '';

    if (imageFile) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(imageFile.mimetype)) {
        throw new BadRequestException('Invalid file type. Only .jpg, .jpeg, and .png are allowed.');
      }

      try {
        if (imageFile.path) {
          // Si le fichier est stocké sur disque, utilisez `upload`.
          const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'posts',
            public_id: `${Date.now()}`,
            overwrite: true,
          });
          imagePath = uploadResult.secure_url;
          await unlink(imageFile.path); // Supprime le fichier temporaire
        } else if (imageFile.buffer) {
          // Si le fichier est en mémoire, utilisez `upload_stream`.
          const stream = Readable.from(imageFile.buffer);
          const uploadResult = await new Promise((resolve, reject) => {
            const streamUpload = cloudinary.uploader.upload_stream(
              { folder: 'posts', public_id: `${Date.now()}`, overwrite: true },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              },
            );
            stream.pipe(streamUpload);
          });
          imagePath = (uploadResult as any).secure_url; // Cast `uploadResult` pour accéder à `secure_url`
        }
      } catch (error) {
        console.error('Erreur de téléchargement vers Cloudinary:', error);
        throw new BadRequestException('Failed to upload image to Cloudinary');
      }
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      user,
      image: imagePath,
    } as DeepPartial<Post>);

    return this.postsRepository.save(post);
  }


  // READ - Get a post by ID
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  
  async findAll(): Promise<any[]> {
    const posts = await this.postsRepository.find({
      relations: ['user'],
    });
  
    return posts.map(post => ({
      ...post, 
      user: post.user, 
    }));
  }
  

  // READ - Get posts by user ID
  async getPostsByUserId(userId: number): Promise<Post[]> {
    const user = await this.userService.findOneById(userId.toString());

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  // UPDATE
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);

    // Suppression de l'image associée dans Cloudinary
    if (post.image) {
      try {
        const publicId = post.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`posts/${publicId}`);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'image de Cloudinary:', error);
      }
    }

    await this.postsRepository.remove(post);
  }
}
