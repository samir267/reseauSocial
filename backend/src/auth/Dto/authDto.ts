import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123!', // Example password to display in Swagger UI
  })
  @IsNotEmpty() // Ensure password is not empty
  @IsString() // Ensure password is a string
  @MinLength(8) // Minimum length for the password

  password: string;
}
