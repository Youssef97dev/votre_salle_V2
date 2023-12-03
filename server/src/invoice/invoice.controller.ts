import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as errors from "../errors";
import { InvoiceService } from "./invoice.service";
import { InvoiceControllerBase } from "./base/invoice.controller.base";
import { Invoice } from "./base/Invoice";
import { InvoiceWhereUniqueInput } from "./base/InvoiceWhereUniqueInput";
import { InvoiceCreateInput } from "./base/InvoiceCreateInput";

@swagger.ApiTags("invoices")
@common.Controller("invoices")
export class InvoiceController extends InvoiceControllerBase {
  constructor(
    protected readonly service: InvoiceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  /*@common.Get("/:id/generate")
  @swagger.ApiOkResponse({ type: Invoice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async generateInvoice(@common.Param() params: InvoiceWhereUniqueInput) {
    await this.service.generateInvoice({
      where: params,
      select: {
        createdAt: true,
        id: true,
        status: true,

        trips: {
          select: {
            id: true,
            tripinfo: true,
            listing: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                phone: true,
                companyInfo: true,
              },
            },
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            phone: true,
            companyInfo: true,
          },
        },
      },
    });
  }*/

  @common.Post()
  @swagger.ApiCreatedResponse({ type: Invoice })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async create(@common.Body() data: InvoiceCreateInput): Promise<Invoice> {
    return await this.service.createAndSend({
      data: {
        ...data,

        trips: data.trips
          ? {
              connect: data.trips,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,
        status: true,

        trips: {
          select: {
            id: true,
            tripinfo: true,
            listing: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                phone: true,
                companyInfo: true,
              },
            },
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            phone: true,
            companyInfo: true,
          },
        },
      },
    });
  }
}
