import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ReqFindAllUserDto,
  ReqFindUserByEmailDto,
  ReqUpdateUserDto,
  ReqUserStatusDto,
  ResUserDto,
} from './dto';
import { UserServices } from './user.services';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  // another routes
  @UseGuards(AdminGuard)
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

  @Put()
  async updateUser(@Body() body: ReqUpdateUserDto): Promise<ResUserDto> {
    return this.userService.updateUser(body);
  }
}
