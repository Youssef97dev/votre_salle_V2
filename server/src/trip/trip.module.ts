import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TripModuleBase } from "./base/trip.module.base";
import { TripService } from "./trip.service";
import { TripController } from "./trip.controller";
import { TripResolver } from "./trip.resolver";

import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    TripModuleBase,
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
      template: {
        dir: __dirname + "templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [TripController],
  providers: [TripService, TripResolver],
  exports: [TripService],
})
export class TripModule {}
