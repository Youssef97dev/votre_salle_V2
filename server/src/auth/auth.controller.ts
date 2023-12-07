import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CheckUserValues, Credentials, SignupCredentials } from "./Credentials";
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
  @UseInterceptors(
    FileInterceptor("profile_logo", {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError("LIMIT_UNEXPECTED_FILE", "profile_logo"), false);
        }
      },
      storage: diskStorage({
        destination: "./src/uploads",
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  async signup(
    @Body() body: SignupCredentials,
    @UploadedFile() profile_logo?: Express.Multer.File
  ): Promise<UserInfo> {
    return this.authService.signup(body);
  }
}
