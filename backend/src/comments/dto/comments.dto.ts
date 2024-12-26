import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()

    @IsString()
    content: string;
    @ApiProperty()

    @IsInt()
    userId: number;
    @ApiProperty()

    @IsInt()
    postId: number;
}
