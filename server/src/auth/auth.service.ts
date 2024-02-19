import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

// @ts-ignore
// eslint-disable-next-line
import { UserService } from "../user/user.service";
import { Credentials, SignupCredentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { PasswordResetTokenService } from "src/passwordResetToken/passwordResetToken.service";
import { UserInfo } from "./UserInfo";
import { User } from "src/user/base/User";
import { JsonValue } from "type-fest";
import { EmailService } from "./email.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly passwordResetService: PasswordResetTokenService,
    private readonly emailService: EmailService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.user({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { id, roles } = user;
      const roleList = roles as string[];
      return { id, username, roles: roleList };
    }
    return null;
  }

  async login(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    const accessToken = await this.tokenService.createToken({
      id: user.id,
      username,
      password,
    });
    return {
      accessToken,
      ...user,
    };
  }

  async signup(credentials: SignupCredentials): Promise<UserInfo> {
    // Extract the username and password from the body of the request
    const {
      firstName,
      lastName,
      username,
      password,
      phone,
      adresse,
      pack,
      companyInfo,
      roles,
      typeUser,
      profileLogo,
    } = credentials;
    const verificationToken = this.generateUniqueToken();
    // Here we attempt to create a new user
    const user = await this.userService.createUser({
      data: {
        username,
        password,
        firstName,
        lastName,
        companyInfo: companyInfo ? companyInfo : undefined,
        phone,
        typeUser,
        adresse,
        pack: Number(pack),
        roles: [roles],
        profileLogo,
        verificationToken,
      },
    });
    // If creating a new user fails throw an error
    if (!user) {
      throw new UnauthorizedException("Could not create user");
    }

    await this.sendVerificationEmail(username, verificationToken);
    // Create an access token for the newly created user
    const accessToken = await this.tokenService.createToken({
      id: user.id,
      username,
      password,
    });
    // Return the access token as well as the some details about the user
    return {
      accessToken,
      username: user.username,
      id: user.id,
      roles: (user.roles as { roles: string[] }).roles,
    };
  }

  async updatePassword(
    userId: string,
    newPassword: string,
    email: string
  ): Promise<UserInfo> {
    // Find the user by ID
    const findUser = await this.userService.user({
      where: { id: userId },
    });
    // If the user is not found, throw an error
    if (!findUser) {
      throw new NotFoundException("User not found");
    }

    const user = await this.userService.updateUser({
      where: { id: userId },
      data: { password: newPassword },
    });

    // Create an access token for the newly created user
    const accessToken = await this.tokenService.createToken({
      id: user.id,
      username: email,
      password: newPassword,
    });
    // Return the access token as well as the some details about the user
    return {
      accessToken,
      username: user.username,
      id: user.id,
      roles: (user.roles as { roles: string[] }).roles,
    };
  }

  async me(authorization: string = ""): Promise<User> {
    const bearer = authorization.replace(/^Bearer\s/, "");
    const username = this.tokenService.decodeToken(bearer);
    const result: any = await this.userService.user({
      where: { username },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        phone: true,
        adresse: true,
        roles: true,
        roleNotification: true,
        typeUser: true,
        typeUserNotification: true,
        companyInfo: true,
        profileImage: true,
        profileLogo: true,
        notifications: true,
        pack: true,
        createdAt: true,
        updatedAt: true,
        isVerified: true,
        listings: true,
      },
    });
    if (!result) {
      throw new NotFoundException(`No resource was found for ${username}`);
    }

    return result;
  }

  async checkUser(email: string) {
    const userStatus: any = await this.userService.user({
      where: { username: email },
      select: { username: true, firstName: true, lastName: true },
    });
    if (!userStatus) {
      throw new NotFoundException(`No resource was found for ${email}`);
    }

    return userStatus;
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userService.user({
      where: { username: email },
    });

    if (user) {
      const resetToken = await this.generateResetToken(user.id);
      const resetLink = `${process.env.FRONT_URL_RESET}?token=${resetToken}&email=${email}`;

      await this.passwordResetService.sendPasswordResetEmail(
        email,
        "Reset Password",
        resetLink
      );
    } else {
      throw (new Error(), `The email does not exist.`);
    }
  }

  async validateResetToken(token: string): Promise<any> {
    const resetToken = await this.passwordResetService.passwordResetToken({
      where: { token },
    });

    if (
      !resetToken ||
      (resetToken.expiresAt !== null && resetToken.expiresAt < new Date())
    ) {
      return { isValid: false };
    }

    return { isValid: true, userId: resetToken.userId };
  }

  async deleteResetToken(token: string): Promise<void> {
    await this.passwordResetService.deletePasswordResetToken({
      where: { token },
    });
  }

  async verifyEmail(verificationToken: string): Promise<boolean> {
    const user = await this.userService.user({
      where: { verificationToken },
    });

    if (user) {
      await this.userService.updateUser({
        where: { verificationToken },
        data: { isVerified: true, verificationToken: null },
      });
      return true;
    }

    return false;
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.FRONT_URL_VERIFY}/verify?token=${token}`;
    await this.emailService.sendEmailVerificationToken(
      email,
      "Email verification",
      verificationLink
    );
  }

  async resendVerification(id: string) {
    try {
      const verificationToken = this.generateUniqueToken();
      const findUser = await this.userService.user({
        where: { id },
      });
      // If the user is not found, throw an error
      if (!findUser) {
        throw new NotFoundException("User not found");
      }
      const user = await this.userService.updateUser({
        where: { id },
        data: { verificationToken },
      });

      await this.sendVerificationEmail(user.username, verificationToken);
      return {
        message_fr:
          "Un email de vérification envoyé. Vérifiez votre courrier électronique.",
        message_en: "A verification email sent. Check your email.",
      };
    } catch (error) {
      return error;
    }
  }

  private async generateResetToken(userId: string): Promise<string> {
    const token = this.generateUniqueToken();
    const expiresAt = this.calculateExpiration();

    await this.passwordResetService.createPasswordResetToken({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  private generateUniqueToken(): string {
    const token = (Math.floor(Math.random() * 9000000) + 1000000).toString();
    return token;
  }

  private calculateExpiration(): Date {
    const expirationHours = 12; // Set the expiration time in hours
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getTime() + expirationHours * 60 * 60 * 1000
    );

    return expirationDate;
  }
}
