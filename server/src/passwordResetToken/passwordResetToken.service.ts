import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PasswordResetTokenServiceBase } from "./base/passwordResetToken.service.base";

@Injectable()
export class PasswordResetTokenService extends PasswordResetTokenServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
