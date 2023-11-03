import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as errors from "../errors";
import { TripService } from "./trip.service";
import { TripControllerBase } from "./base/trip.controller.base";
import { Trip } from "./base/Trip";
import { TripCreateInput } from "./base/TripCreateInput";

@swagger.ApiTags("trips")
@common.Controller("trips")
export class TripController extends TripControllerBase {
  constructor(
    protected readonly service: TripService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @common.Post()
  @swagger.ApiCreatedResponse({ type: Trip })
  @nestAccessControl.UseRoles({
    resource: "Trip",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createWithNotification(
    @common.Body() data: TripCreateInput
  ): Promise<Trip> {
    return await this.service.createWithEmailNotification({
      data: {
        ...data,

        listing: {
          connect: data.listing,
        },

        user: {
          connect: data.user,
        },
      },
      select: {
        createdAt: true,
        id: true,

        listing: {
          select: {
            id: true,
            title: true,
            listingCreatedBy: true,
            locationData: true,
            tax: true,
          },
        },

        tripinfo: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            username: true,
            phone: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
