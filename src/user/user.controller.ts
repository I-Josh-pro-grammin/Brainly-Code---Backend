/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from "@nestjs/common";
import {
  Put,
  UseGuards,
  UseInterceptors,
  Req,
} from "@nestjs/common";
import { User } from "generated/prisma";
import { GetUser } from "src/decorator";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { JwtGuard } from "src/guard";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get("profile")
  getMe(@GetUser() user: User) {
    return this.userService.getMe(user);
  }
  @Put("edit/:id")
  @UseInterceptors(FileInterceptor("file"))
  async editUser(
    @Param("id") id: string,
    @Req() req: Request
  ) {
    const { username, email } = req.body;
    return this.userService.editUser(+id, { username, email });
  }

  @Get(":id")
  getCurrentUser(@Param("id") id: string) {
    return this.userService.getCurrentUser(id);
  }
}
