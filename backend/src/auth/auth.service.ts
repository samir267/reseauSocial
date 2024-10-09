import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { VerifyCodeDto } from './Dto/VerifyCodeDto';
import { User } from 'src/user/entities/user.entity';
import { ForgetPasswordDto } from './Dto/ForgetPasswordDto';
import { ResetPasswordDto } from './Dto/ResetPasswordDto';
import * as crypto from 'crypto';
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneBy(email);

    // Check if user exists and verify password
    if (!user || !(await this.verifyPassword(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

   
     // Generate Access Token
     const payload = { sub: user.id, email: user.email };
     const accessToken = await this.jwtService.signAsync(payload);
 
     // Generate Refresh Token
     const refreshToken = await this.generateRefreshToken(user.id);
     user.refreshToken = refreshToken;
     await this.usersService.updateUser(user)// Save refresh token to DB
 
     return {
       access_token: accessToken,
       refresh_token: refreshToken,
     };
  }
  async signInSocial(user: any) {
    // Here you generate the JWT tokens (access and refresh)
    const payload = { email: user.email, sub: user.id };
    
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m', // Example expiration time
    });
  
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });
    await this.userRepository.update(user.id, { refreshToken: refresh_token,isVerified:true });

    return { access_token, refresh_token };
  }
  private async generateRefreshToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload, {
      expiresIn: '7d', 
    });
  }
  async signUp(payload: CreateUserDto) {
    // Check if the username or email already exists
    const existingUserByEmail = await this.usersService.findOneBy(
      payload.email,
    );
    const existingUserByUsername = await this.usersService.findOneByUsername(
      payload.username,
    ); // Ensure this method is implemented

    if (existingUserByEmail) {
      throw new ConflictException('email already exists'); // Import ConflictException from @nestjs/common
    } else if (existingUserByUsername) {
      const suggestions = await this.suggestUsername(
        payload.username,
        payload.email,
      );
      return { message: 'Username already exists. Suggestions:', suggestions };
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 60);
  
    await this.emailService.sendUserWelcome(payload, code);

    // Hash the password before saving the user
    const hashedPassword = await this.hashPassword(payload.password);
    const userData = { ...payload, password: hashedPassword,    verificationCode: code,
      verificationCodeExpires: expirationTime, 

    }; 
    const user = await this.usersService.create(userData);
    return user;
  }

  async resendVerificationCode(email: string) {
    // Check if the user exists by email
    const user = await this.usersService.findOneBy(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    // Generate a new 4-digit verification code
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Set a new expiration time (30 minutes from now)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);

    // Update the user's verification code and expiration time
    await this.usersService.updateUserVerificationCode(user.id, newCode, expirationTime);

    // Send the new code via email
    await this.emailService.sendUserWelcome(user, newCode);

    return { message: 'Verification code has been resent' };
  }
  // Suggest smarter usernames
  // Helper method to modify a character or append symbols
  private modifyCharacterOrSymbol(input: string): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*';

    const randomIndex = Math.floor(Math.random() * input.length);
    const randomChar =
      Math.random() > 0.5
        ? alphabet[Math.floor(Math.random() * alphabet.length)] // Replace with random letter
        : symbols[Math.floor(Math.random() * symbols.length)]; // Replace with random symbol

    const modifiedUsername = input.split('');
    modifiedUsername[randomIndex] = randomChar;

    return modifiedUsername.join('');
  }

  // Suggest smarter usernames with symbols, numbers, and character modification
  private async suggestUsername(
    username: string,
    email: string,
    maxSuggestions: number = 5,
  ): Promise<string[]> {
    const suggestions: string[] = [];
    const emailPrefix = email.split('@')[0]; // Get the part of the email before '@'
    const symbols = '!@#$%^&*'; // Symbols to be used in the suggestions
    let attempts = 0;

    while (suggestions.length < maxSuggestions && attempts < 100) {
      attempts++;

      // Randomly decide which strategy to use for generating a suggestion
      const randomStrategy = Math.random();

      let proposedUsername: string;

      if (randomStrategy < 0.33) {
        // Strategy 1: Append random number
        const randomNumber = Math.floor(Math.random() * 1000);
        proposedUsername = `${username}${randomNumber}`;
      } else if (randomStrategy < 0.66) {
        // Strategy 2: Modify a character or symbol in the username
        proposedUsername = this.modifyCharacterOrSymbol(username);
      } else {
        // Strategy 3: Append random symbol to username or email prefix
        const randomSymbol =
          symbols[Math.floor(Math.random() * symbols.length)];
        const base = Math.random() > 0.5 ? username : emailPrefix;
        proposedUsername = `${base}${randomSymbol}`;
      }

      // Check if the proposed username exists
      const existingUser =
        await this.usersService.findOneByUsername(proposedUsername);
      if (!existingUser && !suggestions.includes(proposedUsername)) {
        suggestions.push(proposedUsername);
      }
    }

    return suggestions;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust this for security
    return await bcrypt.hash(password, saltRounds);
  }

  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  async verifyCode(payload: VerifyCodeDto) {
    const user = await this.usersService.findOneBy(payload.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the verification code matches
    if (user.verificationCode !== payload.code) {
      throw new BadRequestException('Invalid verification code');
    }

    // Check if the code has expired
    const now = new Date();
    if (user.verificationCodeExpires < now) {
      throw new BadRequestException('Verification code has expired');
    }

    // If the code is correct and not expired, update `isVerified`
    user.isVerified = true;
    user.verificationCode = null; // Clear the verification code after successful verification
    user.verificationCodeExpires = null; // Clear the expiration time
    await this.usersService.updateUser( user);

    return { message: 'User verified successfully' };
  }


  async forgetPassword(payload: ForgetPasswordDto): Promise<{ message: string }> {
    // Find the user by email
    const user: User = await this.usersService.findOneBy(payload.email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
  
    let token: string;
    let isUnique = false;
  
    // Keep generating a new token until a unique one is found
    while (!isUnique) {
      // Generate a secure password reset token
      token = crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex token
  
      // Check if the token is unique
      const existingUserWithToken = await this.usersService.findOneByResetToken(token);
      if (!existingUserWithToken) {
        isUnique = true; // If no user has this token, it's unique
      }
    }
  
    // Save the token and its expiration time in the database
    user.passwordResetToken = token;
    user.passwordResetTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // Token expires in 30 minutes
    await this.usersService.updateUser(user);
  
    // Send the email with the reset link
    await this.emailService.sendPasswordResetEmail(user.email, token,user.username);
    return { message: 'An email with instructions to reset your password has been sent to your registered email address. Please check your inbox and follow the link to create a new password' };

  }
  
  
  async resetPassword(newPasswordDto:ResetPasswordDto): Promise<{ message: string,user:any }> {
    // Find the user by token
    const user = await this.usersService.findOneByResetToken(newPasswordDto.token);
  
    if (!user) {
      throw new NotFoundException('Invalid  token');
    }
  
    // Check if the token has expired
    if (user.passwordResetTokenExpires < new Date()) {
      throw new BadRequestException('Token has expired');
    }
  
    // Hash the new password
    const hashedPassword = await this.hashPassword(newPasswordDto.newPassword);
  
    // Update the user's password and clear the reset token fields
    user.password = hashedPassword;
    user.passwordResetToken = null; // Clear the token
    user.passwordResetTokenExpires = null; // Clear the expiration
    await this.usersService.updateUser(user);
    return { message: 'Password updated successfully' ,user};

  }
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    return {
      message: 'User Info from Google',
      user: req.user
    }
  }

}
