/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from "@nestjs/common";
import { User } from "generated/prisma";
import { GetUser } from "src/decorator";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Get("profile")
  getMe(@GetUser() user: User) {
    return  this.userService.getMe(user);
  }

  @Get(':id')
  GetCurrentUser(@Param('id') id: string) {
    return this.userService.getCurrentUser(id);
  }

}
