import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,VerifyCallback } from 'passport-google-oauth20';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/user/entities/userRole';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    config: ConfigService
  ) {
    super({
      clientID: config.get('ClientID'),
      clientSecret: config.get('ClientSecret'),
      callbackURL: config.get('callbackURLEmail'),
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    try {
      const { emails, displayName, id, photos } = profile; // Extract photos
      const email = emails[0].value;
      const photoUrl = photos[0].value; // Get the photo URL
      // Check if the user exists in the database
      let user = await this.userRepository.findOne({ where: { email } });

      if (user) {
        // If the user exists, update their Google information
        user.googleId = id;
        user.provider = 'google';
        user.profilePhotoUrl=photoUrl
        await this.userRepository.save(user);
      } else {
        // If the user doesn't exist, create a new user
        user = this.userRepository.create({
          email,
          username: displayName,
          googleId: id,
          provider: 'google',
          role:UserRole.USER

        });
        await this.userRepository.save(user);
      }

      done(null, { id: user.id}); // Pass the user object to the next step
    } catch (err) {
      done(err, false);
    }
  }
}
