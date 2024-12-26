import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ description: 'The URL of the image associated with the post', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: 'The content text of the post', required: false })
  @IsString()
  @IsOptional()
  text?: string;
}
