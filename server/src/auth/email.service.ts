import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {
  }

  async sendEmailVerificationToken(
    to: string,
    subject: string,
    verificationLink: string
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        html: `Click <a href="${verificationLink}"> Here </a> to verify your email`,
      });
    } catch (error) {
      // Handle any email sending errors here
      console.error("Email sending error:", error);
    }
  }
}
