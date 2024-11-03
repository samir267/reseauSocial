/* eslint-disable prettier/prettier */
import { Injectable ,NotFoundException, UnauthorizedException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { MongoRepository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { jwtConstants } from "src/auth/utils/constants";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
) { }
  async findOneBy(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }
 
  async deactivateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.isDeactivated = !user.isDeactivated;

    return this.userRepository.save(user);
  }
  
  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
  
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
        ...createUserDto,
        createdAt: new Date(),
    });
  }
  async updateUser(user:User): Promise<User> {
    const existuser = await this.userRepository.findOneBy(user.id);
  
    if (!existuser) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }
  
    // Update user fields from DTO
  
    return this.userRepository.save(user);
  }
  async findOneById(id:string):Promise<User>{
    return this.userRepository.findOneBy({id});
  }
   // Function to get refresh token by user ID
   async getRefreshTokenByUserId(userId: number, key: string): Promise<string> {
    // Verify the key (you might want to do this in a more secure way)
    if (key !== jwtConstants.secret) {
      throw new UnauthorizedException('Invalid key');
    }

    // Find user by ID
    const user = await this.userRepository.findOneBy(where => where.id === userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return the refresh token if it exists
    if (!user.refreshToken) {
      throw new UnauthorizedException('No refresh token found for this user');
    }

    return user.refreshToken;
  }
  async updateUserVerificationCode(userId: number, code: string, expirationTime: Date): Promise<void> {
    await this.userRepository.update(userId, {
      verificationCode: code,
      verificationCodeExpires: expirationTime,
    });
  }
  async findOneByResetToken(token: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { passwordResetToken: token },
    });
  }
 
  
  
  

}