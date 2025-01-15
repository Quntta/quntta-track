import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/enum/config.enum';
import { User } from './user.entity';
@Controller('user')
export class UserController {
  constructor(
    private UserService: UserService,
    private ConfigService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    return this.UserService.findAll();
  }

  @Post()
  addUser(@Body() user: User): any {
    return this.UserService.create(user);
  }

  @Get('profile')
  getProfile(@Query() id: number): any {
    console.log('id', id);
    return this.UserService.findProfile(1);
  }

  @Get('logs')
  getLogs(@Query() id: number): any {
    return this.UserService.findLogs(1);
  }

  @Get('logsByGroup')
  async getLogsByGroup(@Query('id') id: number): Promise<any> {
    console.log('id', id);
    const res = await this.UserService.findLogsByGroup(id);
    return res.map((item: any) => ({
      result: item.result,
      count: item.count,
    }));
  }
}
