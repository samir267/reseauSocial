import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john_doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The verification code sent to the user’s email',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  code: string;
}
