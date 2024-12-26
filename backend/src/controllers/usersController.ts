import { PrismaClient, User } from "@prisma/client";
import { Body, Controller, Get, Path, Post, Response, Route } from "tsoa";

// const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] }); // 推奨
const prisma = new PrismaClient();

// User型はprisma.schemaで定義したモデルに基づいて自動生成された型
type UserCreationParams = Pick<User, "email" | "name" | "password">;

interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  @Response<ValidateErrorJSON>(422, "Validation Failed")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
  ): Promise<void> {
    await prisma.user.create({
      data: { ...requestBody },
    });
    return;
  }
}
