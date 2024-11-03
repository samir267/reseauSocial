/* eslint-disable prettier/prettier */
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<number, string>(); // Stores userId to socketId mapping

  constructor(private readonly messageService: MessageService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // Find user by socket ID and remove them
    const userId = Array.from(this.onlineUsers.keys()).find(
      (key) => this.onlineUsers.get(key) === client.id,
    );
    if (userId) {
      this.onlineUsers.delete(userId);
      this.server.emit('userOffline', { userId });
      console.log(`User ${userId} went offline`);
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ): void {
    this.onlineUsers.set(userId, client.id); // Add user to online users map
    client.join(`user_${userId}`);
    console.log(`User ${userId} joined room: user_${userId}`);

    // Notify all clients that this user is online
    this.server.emit('userOnline', { userId });
    client.emit('roomJoined', { userId, room: `user_${userId}` });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() messageData: { senderId: number; receiverId: number; text: string; conversationId: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { senderId, receiverId, text, conversationId } = messageData;

    const createMessageDto: CreateMessageDto = {
      conversationId,
      senderId,
      receiverId,
      content: text,
    };

    try {
      const savedMessage = await this.messageService.addMessage(createMessageDto);
      this.server.to(`user_${receiverId}`).emit('receiveMessage', savedMessage);
    } catch (error) {
      client.emit('error', { message: 'Message could not be sent', details: error.message });
    }
  }

  @SubscribeMessage('getOnlineUsers')
  handleGetOnlineUsers(@ConnectedSocket() client: Socket) {
    // Send the list of currently online users to the requesting client
    const onlineUserIds = Array.from(this.onlineUsers.keys());
    client.emit('onlineUsers', onlineUserIds);
  }
}
