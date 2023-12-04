import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { InvoiceService } from "./invoice.service";
import { InvoiceControllerBase } from "./base/invoice.controller.base";
import { Invoice } from "./base/Invoice";
import { InvoiceWhereUniqueInput } from "./base/InvoiceWhereUniqueInput";

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


  @common.Post("/generate/:id")
  @swagger.ApiOkResponse({ type: Invoice })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "own",
  })
  async generateInvoice(
    @common.Param() params: InvoiceWhereUniqueInput, @common.Res() res:any
  ): Promise<Invoice | null> {
    const result : any = await this.service.generateInvoice({
      where: params,
      select: {
        createdAt: true,
        id: true,
        status: true,

        trips: true,

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });

    // Set headers for file download
    res.download(result, 'invoice.pdf');

    return result;
  }
}
