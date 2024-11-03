import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateConversationDto {
  // src/conversation/dto/create-conversation.dto.ts

  @ApiProperty({
    description: 'The ID of the first user involved in the conversation.',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  user1Id: number;

  @ApiProperty({
    description: 'The ID of the second user involved in the conversation.',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  user2Id: number;
}
