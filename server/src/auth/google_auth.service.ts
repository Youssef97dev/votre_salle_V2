import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { User } from "src/user/base/User";
import { UserService } from "src/user/user.service";
import { TokenService } from "./token.service";

@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {
    const url = process.env.BASE_URL;
    super({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: `${url}/api/auth/google/callback`,
      scope: [process.env.scope_profile, process.env.scope_email],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    const userEmail =
      profile.emails && profile.emails.length > 0
        ? profile.emails[0].value
        : null;
    if (!userEmail) {
      // If the email is not available, handle the error
      throw new UnauthorizedException("Email not provided by Google");
    }
    try {
      // Check if a user with the given email already exists in your database
      const existUser = await this.userService.user({
        where: { username: userEmail },
      });
      if (existUser) {
        const accessToken = await this.tokenService.createToken({
          id: existUser.id,
          username: existUser.username,
          password: "VS2025@2025",
        });
        const authUser = {
          id: existUser.id,
          username: existUser.username,
          accessToken, // Include the accessToken here
          profile: existUser.profileImage,
          roles: (existUser.roles as { roles: string[] }).roles,
        };
        return done(null, authUser);
      } else {
        const user = await this.userService.createUser({
          data: {
            username: userEmail,
            password: "null",
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            companyInfo: {},
            phone: null,
            typeUser: "B2C",
            adresse: null,
            roles: ["user"],
          },
        });

        const accessToken = await this.tokenService.createToken({
          id: user.id,
          username: user.username,
          password: "VS2025@2025",
        });
        const authUser = {
          id: user.id,
          username: user.username,
          accessToken,
          refreshToken,
          profile: user.profileImage,
          roles: (user.roles as { roles: string[] }).roles,
        };
        done(null, authUser);
      }
    } catch (error: any) {
      throw new InternalServerErrorException(
        "Error during Google authentication",
        error.message
      );
    }
  }
}
