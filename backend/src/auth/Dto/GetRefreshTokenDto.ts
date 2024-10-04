import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRefreshTokenDto {
  @ApiProperty({
    description: 'your secret key here',
    example: 'your-secret-key-here',
  })
  @IsString()
  secretKey: string;
}
