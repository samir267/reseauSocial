import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "./utils/public-strategy";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./Dto/authDto";
import { RefreshTokenDto } from "./Dto/RefreshTokenDto";
@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,

  ) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({ summary: "User Login" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [CreateUserDto],
  })
  signIn(@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  @ApiOperation({ summary: "User Signup" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [CreateUserDto],
  })
  signUp(@Body() signUpDto: CreateUserDto) {
    const payload = {
      username: signUpDto.username, 
      email: signUpDto.email, 
      password: signUpDto.password,
      createdAt: new Date(),
      role:signUpDto.role
    }
    return this.authService.signUp(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  @ApiOperation({ summary: "Refresh token" })
  @ApiResponse({
    status: 200,
    description: "Refresh token updated successfully",
    type: [RefreshTokenDto],
  })
  async refreshToken(@Body() body: RefreshTokenDto) {
    const refreshToken = body.refreshToken; // Assurez-vous que body est de type { refreshToken: string }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.userService.findOneById(payload.sub);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email });
      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Unothorized to refresh');
    }
  }
  @Get('refresh-token/:userId')
  async getRefreshToken(@Param('userId') userId: number, @Query('key') key: string) {
    return this.userService.getRefreshTokenByUserId(userId, key);
  }
}
