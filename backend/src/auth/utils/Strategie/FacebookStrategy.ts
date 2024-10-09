import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/user/entities/userRole';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor( @InjectRepository(User) private userRepository: Repository<User>,
  config: ConfigService) {
    super({
      clientID: config.get('FACEBOOK_CLIENT_ID'),
      clientSecret: config.get('FACEBOOK_CLIENT_SECRET'),
      callbackURL: config.get('callbackURLFacebook'),
      profileFields: ['id', 'name', 'emails', 'photos'],
      scope: ['email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    try {
      // Extract relevant fields from the Facebook profile
      const { emails, id, name, photos } = profile; // Extract name and photos
  
      // Extract email, if available
      const email = emails && emails.length > 0 ? emails[0].value : null;
      const photoUrl = photos && photos.length > 0 ? photos[0].value : null;
  
      // Log the profile for debugging
  
      // Check if the email is available
      if (!email) {
        return done(new Error('No email provided by Facebook'), false);
      }
  
      // Check if the user exists in the database
      let user = await this.userRepository.findOne({ where: { email } });
  
      if (user) {
        // If the user exists, update their Facebook information
        user.facebookId = id;
        user.provider = 'facebook';
        user.profilePhotoUrl = photoUrl; // Update profile photo URL
        await this.userRepository.save(user);
      } else {
        // If the user doesn't exist, create a new user
        user = this.userRepository.create({
          email,
          username: `${name.givenName} ${name.familyName}`, // Use given and family name for username
          facebookId: id,
          provider: 'facebook',
          profilePhotoUrl: photoUrl, // Save the profile photo URL
          role:UserRole.USER
        });
        await this.userRepository.save(user);
      }
  
      // Pass only the user ID to the next step, as per your requirement
      done(null, { id: user.id });
    } catch (err) {
      done(err, false);
    }
  }
  
}
