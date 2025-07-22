/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { User } from "generated/prisma";
import { GetUser } from "src/decorator";
import { JwtGuard } from "src/guard";
import { EditUserDto } from "./dto";
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
  
  @UseGuards(JwtGuard)
  @Put('/edit/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(+id, { ...dto });
  }
 
  @UseGuards(JwtGuard)
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  GetCurrentUser(@Param('id') id: string) {
    return this.userService.getCurrentUser(id);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
