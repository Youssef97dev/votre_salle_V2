import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PasswordResetTokenModuleBase } from "./base/passwordResetToken.module.base";
import { PasswordResetTokenService } from "./passwordResetToken.service";
import { PasswordResetTokenController } from "./passwordResetToken.controller";
import { PasswordResetTokenResolver } from "./passwordResetToken.resolver";

@Module({
  imports: [PasswordResetTokenModuleBase, forwardRef(() => AuthModule)],
  controllers: [PasswordResetTokenController],
  providers: [PasswordResetTokenService, PasswordResetTokenResolver],
  exports: [PasswordResetTokenService],
})
export class PasswordResetTokenModule {}
