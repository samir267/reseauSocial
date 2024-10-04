import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token',
    example: 'your-refresh-token-here',
  })
  @IsString()
  refreshToken: string;
}
