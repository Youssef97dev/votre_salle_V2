import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PasswordResetTokenModuleBase } from "./base/passwordResetToken.module.base";
import { PasswordResetTokenService } from "./passwordResetToken.service";
import { PasswordResetTokenController } from "./passwordResetToken.controller";
import { PasswordResetTokenResolver } from "./passwordResetToken.resolver";

import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    PasswordResetTokenModuleBase,
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
        tls: {
          rejectUnauthorized: true,
        },
      },
    }),
  ],
  controllers: [PasswordResetTokenController],
  providers: [PasswordResetTokenService, PasswordResetTokenResolver],
  exports: [PasswordResetTokenService],
})
export class PasswordResetTokenModule {}
