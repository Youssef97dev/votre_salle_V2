import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { PasswordResetTokenResolverBase } from "./base/passwordResetToken.resolver.base";
import { PasswordResetToken } from "./base/PasswordResetToken";
import { PasswordResetTokenService } from "./passwordResetToken.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => PasswordResetToken)
export class PasswordResetTokenResolver extends PasswordResetTokenResolverBase {
  constructor(
    protected readonly service: PasswordResetTokenService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
