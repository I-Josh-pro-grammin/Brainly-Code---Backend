/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from "@nestjs/common";
import { User } from "generated/prisma";
import { GetUser } from "src/decorator";
import { JwtGuard } from "src/guard";
import { EditUserDto } from "./dto";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";

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
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    const { username, email } = req.body;
    return this.userService.editUser(+id, { username, email });
  }

  @UseGuards(JwtGuard)
  @Get("")
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(":id")
  getCurrentUser(@Param("id") id: string) {
    return this.userService.getCurrentUser(id);
  }

  @UseGuards(JwtGuard)
  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

}
