import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateUserDto,
  ReqFindAllUserDto,
  ReqFindUserByEmailDto,
  ReqUserStatusDto,
  ResUserDto,
} from './dto';
import { UserServices } from './user.services';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  // another routes
  @Post('/get-all-users')
  async getAllUser(@Body() body: ReqFindAllUserDto): Promise<ResUserDto[]> {
    return this.userService.getAllUser(body);
  }

  @Post('/find-by-email')
  async findByEmail(@Body() body: ReqFindUserByEmailDto): Promise<ResUserDto> {
    return await this.userService.getUserByEmail(body.email);
  }

  //  /:id
  @Get('/:id')
  findById(@Param('id') id: string): Promise<ResUserDto> {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  async changeStatusUser(
    @Param('id') id: string,
    @Body() body: ReqUserStatusDto,
  ): Promise<ResUserDto> {
    return this.userService.changeStatusUser(id, body);
  }

  //  /user
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<ResUserDto> {
    return this.userService.createUser(body);
  }

  @Put()
  async updateUser(@Body() body: ReqUserStatusDto): Promise<ResUserDto> {
    return this.userService.updateUser(body);
  }
}
