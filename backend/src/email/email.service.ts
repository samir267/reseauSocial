// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService,        
    private readonly configService: ConfigService,
  ) {}

  async sendUserWelcome(user: any, code: string) {

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', 
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome', // `.ejs` extension is appended automatically
      context: { // filling <%= %> brackets with content
        name: user.username,
        code:code
      },
    });
  }
  async sendPasswordResetEmail(email: string, token: string,username:string): Promise<void> {
    const baseUrl = this.configService.get<string>('FrontendUrl'); // Replace 'BASE_URL' with your actual environment variable key
    const resetLink = encodeURI(`${baseUrl}/reset-password?token=${token}`);
        
    await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset Request',
        template: './reset-password', // Adjust to your template path
        context: {
            resetLink,
            username
        },
    });
}

}