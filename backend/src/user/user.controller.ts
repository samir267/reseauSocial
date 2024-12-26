/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,

  Param,
  Body,
  NotFoundException,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/utils/Guard/auth.guard';
import { Public } from 'src/auth/utils/public-strategy';

@Controller('users')
@ApiTags('user')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Public()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate User' })
  @ApiResponse({
    status: 200,
    description: 'User deactivated successfully.',
    type: User,
  })
  async deactivateUser(@Param('id') userId: string): Promise<User> {
    return this.userService.deactivateUser(userId);
  }



  @Get('all/:currentUserId')
@ApiOperation({ summary: 'Get All Users' })
@HttpCode(HttpStatus.OK)
@ApiResponse({
  status: 200,
  description: 'All users found.',
  type: [User], // Notez que cela doit être un tableau d'utilisateurs, pas un utilisateur unique
})
async getAllUsers(@Param('currentUserId') currentUserId: number): Promise<User[]> {
  return this.userService.getAllUsers(currentUserId);
}




  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: User,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    const existingUser = await this.userService.findOneById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = { ...existingUser, ...updateUserDto };
    return this.userService.updateUser(updatedUser);
  }
  @HttpCode(HttpStatus.OK)
  @Get('email/:email')
  @ApiOperation({ summary: 'Get User by Email' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: User, // The response type
  })
  @ApiResponse({
    status: 404,
    description: 'User with the specified email not found.',
  })
  async findByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findOneBy(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('username/:username')
  @ApiOperation({ summary: 'Get User by Username' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: User, // The response type
  })
  @ApiResponse({
    status: 404,
    description: 'User with the specified username not found.',
  })
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: User, // The response type
  })
  @ApiResponse({
    status: 404,
    description: 'User with the specified ID not found.',
  })
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }


  

}
