import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PasswordResetTokenService } from "./passwordResetToken.service";
import { PasswordResetTokenControllerBase } from "./base/passwordResetToken.controller.base";

@swagger.ApiTags("passwordResetTokens")
@common.Controller("passwordResetTokens")
export class PasswordResetTokenController extends PasswordResetTokenControllerBase {
  constructor(
    protected readonly service: PasswordResetTokenService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
