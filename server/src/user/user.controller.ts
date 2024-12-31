import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/enum/config.enum';
@Controller('user')
export class UserController {
  constructor(
    private UserService: UserService,
    private ConfigService: ConfigService,
  ) {}
  @Get()
  getUsers(): any {
    const db = this.ConfigService.get(ConfigEnum.DB);
    console.log('db', db);
    console.log(process.env.NODE_ENV);
    return this.UserService.getUsers();
  }
  @Post()
  addUser(@Body() user: any): any {
    return this.UserService.addUser(user);
  }
}
