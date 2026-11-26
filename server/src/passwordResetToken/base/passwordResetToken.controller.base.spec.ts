import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { PasswordResetTokenController } from "../passwordResetToken.controller";
import { PasswordResetTokenService } from "../passwordResetToken.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  expiresAt: new Date(),
  id: "exampleId",
  token: "exampleToken",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  createdAt: new Date(),
  expiresAt: new Date(),
  id: "exampleId",
  token: "exampleToken",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    expiresAt: new Date(),
    id: "exampleId",
    token: "exampleToken",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  expiresAt: new Date(),
  id: "exampleId",
  token: "exampleToken",
  updatedAt: new Date(),
};

const service = {
  createPasswordResetToken() {
    return CREATE_RESULT;
  },
  passwordResetTokens: () => FIND_MANY_RESULT,
  passwordResetToken: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("PasswordResetToken", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PasswordResetTokenService,
          useValue: service,
        },
      ],
      controllers: [PasswordResetTokenController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /passwordResetTokens", async () => {
    await request(app.getHttpServer())
      .post("/passwordResetTokens")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiresAt: CREATE_RESULT.expiresAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /passwordResetTokens", async () => {
    await request(app.getHttpServer())
      .get("/passwordResetTokens")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          expiresAt: FIND_MANY_RESULT[0].expiresAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /passwordResetTokens/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/passwordResetTokens"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /passwordResetTokens/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/passwordResetTokens"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        expiresAt: FIND_ONE_RESULT.expiresAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /passwordResetTokens existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/passwordResetTokens")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiresAt: CREATE_RESULT.expiresAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/passwordResetTokens")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
