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
  async updateUser(
    @common.Param() params: UserWhereUniqueInput,
    @common.Body() data: UserUpdateInput
  ): Promise<User | null> {
    try {
      return await this.service.updateUser({
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
      });
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
