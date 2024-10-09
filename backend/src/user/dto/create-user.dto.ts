import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/userRole';

export class CreateUserDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john_doe@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'securePassword123',
    })
  
    @ApiProperty({
        description: 'The password of the user',
        example: 'Password123!', // Example password to display in Swagger UI
      })
      @IsNotEmpty()
      @IsString()
      @MinLength(8, {
        message: 'Password must be at least 8 characters long',
      })
      @Matches(/(?=.*[a-z])/, {
        message: 'Password must contain at least one lowercase letter',
      })
      @Matches(/(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
      })
      @Matches(/(?=.*\d)/, {
        message: 'Password must contain at least one number',
      })
      @Matches(/(?=.*[@$!%*?&#^()_+|~=`{}[\]:;"'<>,./?\\-])/, {
        message: 'Password must contain at least one symbol',
      })
      password: string;

    @ApiProperty({
        description: 'The location of the user (optional)',
        example: 'New York, USA',
        required: false,
    })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({
        description: 'The role of the user',
        enum: UserRole,
        example: UserRole.USER, // or whatever role you consider as the default
    })
    role: UserRole;

    @ApiProperty({
        description: 'The occupation of the user (optional)',
        example: 'Software Developer',
        required: false,
    })
    @IsOptional()
    @IsString()
    occupation?: string;
    @IsOptional()
    @IsString()
    provider?: string;
}
