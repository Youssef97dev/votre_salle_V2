import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";
import * as errors from "../errors";
import { User } from "./base/User";
import { UserUpdateInput } from "./base/UserUpdateInput";
import { UserWhereUniqueInput } from "./base/UserWhereUniqueInput";
import { isRecordNotFoundError } from "../prisma.util";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import path from "path";
import { Response } from "express";
import * as fs from "fs";

@swagger.ApiTags("users")
@common.Controller("users")
export class UserController extends UserControllerBase {
  constructor(
    protected readonly service: UserService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @common.Get("/images/:imageName")
  async getImage(
    @common.Param("imageName") imageName: string,
    @common.Res() res: Response
  ) {
    const imagePath = path.resolve("./src/uploads", imageName);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    return res.send({ imageSrc: base64Image });
  }

  @common.Delete("/images/:imageName")
  async deleteImage(
    @common.Param("imageName") imageName: string,
    @common.Res() res: Response
  ) {
    try {
      const imagePath = path.resolve("./src/uploads", imageName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the previous image if it exists
        return res.status(200).send({ message: "Previous image deleted" });
      } else {
        return res.status(404).send({ message: "Image not found" });
      }
    } catch (error) {
      return res.status(500).send({ error: "Failed to delete image" });
    }
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @common.UseInterceptors(
    FileInterceptor("profileImage", {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError("LIMIT_UNEXPECTED_FILE", "profileImage"), false);
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
  async updateUser(
    @common.Param() params: UserWhereUniqueInput,
    @common.Body() data: UserUpdateInput,
    @common.UploadedFile() profileImage?: Express.Multer.File
  ): Promise<User | null> {
    try {
      return await this.service.updateUser(
        {
          where: params,
          data: data,
          select: {
            adresse: true,
            companyInfo: true,
            createdAt: true,
            firstName: true,
            id: true,
            lastName: true,
            phone: true,
            profileImage: true,
            profileLogo: true,
            roles: true,
            roleNotification: true,
            typeUser: true,
            typeUserNotification: true,
            updatedAt: true,
            username: true,
            pack: true,
          },
        },
        profileImage
      );
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
