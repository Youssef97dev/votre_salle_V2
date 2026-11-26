import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { InvoiceModuleBase } from "./base/invoice.module.base";
import { InvoiceService } from "./invoice.service";
import { InvoiceController } from "./invoice.controller";
import { InvoiceResolver } from "./invoice.resolver";

import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [InvoiceModuleBase, forwardRef(() => AuthModule), MailerModule.forRoot({
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
  }),],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
