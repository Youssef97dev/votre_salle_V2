import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PasswordService } from "../auth/password.service";
import { UserServiceBase } from "./base/user.service.base";

import {
  Prisma,
  User, // @ts-ignore
} from "@prisma/client";
import { transformStringFieldUpdateInput } from "../prisma.util";

@Injectable()
export class UserService extends UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {
    super(prisma, passwordService);
  }

  async updateUser<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
    profileImage?: Express.Multer.File
  ): Promise<User> {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password &&
          (await transformStringFieldUpdateInput(
            args.data.password,
            (password) => this.passwordService.hash(password)
          )),
        
        companyInfo: typeof args.data.companyInfo === "string" ? JSON.parse(args.data.companyInfo) : null,
        profileImage: profileImage ? profileImage.filename : null,
      },
    });
  }
}
