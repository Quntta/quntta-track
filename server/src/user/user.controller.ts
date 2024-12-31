import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  getUsers(): any {
    return this.UserService.getUsers();
  }
  @Post()
  addUser(@Body() user: any): any {
    return this.UserService.addUser(user);
  }
}
