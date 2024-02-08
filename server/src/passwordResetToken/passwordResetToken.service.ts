import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PasswordResetTokenServiceBase } from "./base/passwordResetToken.service.base";

import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class PasswordResetTokenService extends PasswordResetTokenServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {
    super(prisma);
  }

  async sendPasswordResetEmail(
    to: string,
    subject: string,
    resetLink: string
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        html: `Click the following link to reset your password: ${resetLink}`,
      });
    } catch (error) {
      // Handle any email sending errors here
      console.error("Email sending error:", error);
    }
  }
}
