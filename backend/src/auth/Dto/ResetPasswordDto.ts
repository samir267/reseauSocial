import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
 

  @ApiProperty({
    description: 'The password reset token',
    example: 'abc123xyz',
  })
  @IsString()
  @IsNotEmpty()
  token: string;


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
  newPassword: string;
}
