import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import {
  CheckUserValues,
  Credentials,
  SignupCredentials,
  ResetCredentials,
} from "./Credentials";
import { UserInfo } from "./UserInfo";
import { User } from "src/user/base/User";
import { Request } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

@ApiTags("auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get("me")
  async me(@Req() request: Request): Promise<User> {
    return this.authService.me(request.headers.authorization);
  }
  @Post("check-user")
  async checkUser(@Body() body: CheckUserValues): Promise<User> {
    return this.authService.checkUser(body.email);
  }
  @Post("login")
  async login(@Body() body: Credentials): Promise<UserInfo> {
    return this.authService.login(body);
  }
  @Post("signup")
  async signup(@Body() body: SignupCredentials): Promise<UserInfo> {
    return this.authService.signup(body);
  }

  @Post("request-recover-password")
  async requestPasswordReset(
    @Body() body: ResetCredentials
  ): Promise<{ message: string }> {
    // Check if the email is provided
    if (!body.username) {
      throw new BadRequestException(
        "Email is required to send the password reset token."
      );
    }

    try {
      // Call the service method to handle the password reset request
      await this.authService.requestPasswordReset(body.username);
      return { message: "The password reset token has been sent successfully" };
    } catch (error: any) {
      // Handle any errors that may occur during the process
      throw new BadRequestException(
        `Failed to send password reset token: ${error}`
      );
    }
  }

  @Post("reset-password")
  async resetPassword(
    @Body()
    resetPasswordDto: {
      newPassword: string;
      resetToken: string;
      email: string;
    }
  ) {
    const { isValid, userId } = await this.authService.validateResetToken(
      resetPasswordDto.resetToken
    );

    if (!isValid) {
      throw new BadRequestException("Invalid or expired reset token");
    }

    await this.authService.updatePassword(
      userId,
      resetPasswordDto.newPassword,
      resetPasswordDto.email
    );
    await this.authService.deleteResetToken(resetPasswordDto.resetToken);

    return { message: "You have successfully changed the password." };
  }
}
