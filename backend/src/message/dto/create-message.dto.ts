/* eslint-disable prettier/prettier */
// src/message/dto/create-message.dto.ts

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'The ID of the conversation' })
  @IsNumber()
  @IsNotEmpty() // Add this to ensure the value must not be empty

  conversationId: number;

  @ApiProperty({ description: 'The ID of the sender' })
  @IsNumber()
  senderId: number;

  @ApiProperty({ description: 'The ID of the receiver' })
  @IsNumber()
  receiverId: number;

  @ApiProperty({ description: 'The content of the message' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
