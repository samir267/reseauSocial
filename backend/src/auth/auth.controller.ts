/* eslint-disable prettier/prettier */
import { Body, Controller,Delete, Post, HttpCode, HttpStatus, UnauthorizedException, Get, Param, UseGuards, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "./utils/public-strategy";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./Dto/authDto";
import { RefreshTokenDto } from "./Dto/RefreshTokenDto";
import { VerifyCodeDto } from "./Dto/VerifyCodeDto";
import { ForgetPasswordDto } from "./Dto/ForgetPasswordDto";
import { ResetPasswordDto } from "./Dto/ResetPasswordDto";

import { Response } from 'express'; // Import Response from Express
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
    private config: ConfigService

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
 
  @Post('resend-code/:email')
  @ApiOperation({ summary: 'Resend the verification code' })
  @ApiParam({ name: 'email', required: true, description: 'The email of the user' })
  @ApiResponse({ status: 200, description: 'Verification code has been resent' })
  @ApiResponse({ status: 404, description: 'User with this email does not exist' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  async resendCode(@Param('email') email: string) {
    return this.authService.resendVerificationCode(email);
  }
  @Public()
  @Post('verify-code')
  @ApiOperation({ summary: 'Verify the user verification code' })
  @ApiResponse({ status: 200, description: 'User verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired verification code' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async verifyCode(@Body() payload: VerifyCodeDto) {
    return this.authService.verifyCode(payload);
  }

  @Public()
  @Post('forget-password')
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  @ApiResponse({ status: 404, description: 'User with this email does not exist' })
  @HttpCode(200) // Set response status to 200 OK

  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
  @Public()
  @Post('reset-password')
@ApiOperation({ summary: 'Reset user password' })
@ApiResponse({ status: 200, description: 'Password has been reset' })
@ApiResponse({ status: 404, description: 'Invalid or expired token' })
@HttpCode(200) // Set response status to 200 OK

async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
}
@Public()
@Get()
@UseGuards(AuthGuard('google'))
async googleAuth(@Req() req) { }
@Public()
@Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleAuthRedirect(@Req() req,@Res() res: Response) {
  
    // Google profile info is available in req.user (returned from validate function in GoogleStrategy)
    const user = req.user;

    // Call signInSocial to generate JWT access and refresh tokens
    const tokens = await this.authService.signInSocial(user);

    res.cookie('accessToken', tokens.access_token, { httpOnly: true });
    res.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });
    return res.redirect(`${this.config.get('FrontendUrl')}/home`);
}
@Public()
@Get('facebook')
@UseGuards(AuthGuard('facebook'))
async facebookAuth(@Req() req) {
  // Initiates the Facebook login flow
}
@Public()
@Get('facebook/callback')
@UseGuards(AuthGuard('facebook'))
async facebookAuthRedirect(@Req() req,@Res() res: Response) {
  const user = req.user;

  console.log('Facebook Auth Success:', user);

  const tokens = await this.authService.signInSocial(user);


    // Set tokens in cookies (if desired) or include them in query params for redirection
    res.cookie('accessToken', tokens.access_token, { httpOnly: true });
    res.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });
    return res.redirect(`${this.config.get('FrontendUrl')}/home`);
    
}



}
