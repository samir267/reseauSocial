import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
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

    // Hash the password before saving the user
    const hashedPassword = await this.hashPassword(payload.password);
    const userData = { ...payload, password: hashedPassword }; // Replace plain password with hashed one
    const user = await this.usersService.create(userData);
    return user;
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
}
