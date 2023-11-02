import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";

@Injectable()
export class PrismaService
  extends PrismaClient<
    PrismaClientOptions,
    "beforeExit" | "query" | "info" | "warn" | "error"
  >
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
