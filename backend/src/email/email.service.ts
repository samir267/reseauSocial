// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

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
}