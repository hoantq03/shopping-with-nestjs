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
import { AuthGuard } from 'src/guard/auth.guard';
import { ReqAddAddress, ResAddressDto } from './dto/add-address';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  // another routes
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Post('/get-all-users')
  async getAllUser(@Body() body: ReqFindAllUserDto): Promise<ResUserDto[]> {
    return this.userService.getAllUser(body);
  }

  @Post('/find-by-email')
  async findByEmail(@Body() body: ReqFindUserByEmailDto): Promise<ResUserDto> {
    return await this.userService.getUserByEmail(body.email);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Put('/:id')
  async changeStatusUser(
    @Param('id') id: string,
    @Body() body: ReqUserStatusDto,
  ): Promise<ResUserDto> {
    return this.userService.changeStatusUser(id, body);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Put()
  async updateUser(@Body() body: ReqUpdateUserDto): Promise<ResUserDto> {
    return this.userService.updateUser(body);
  }

  @UseGuards(AuthGuard)
  @Post('/add-address')
  async newAddress(@Body() body: ReqAddAddress): Promise<ResAddressDto> {
    return this.userService.addAddress(body);
  }

  @UseGuards(AuthGuard)
  @Get('/get-all-address')
  async getAllAddress(): Promise<ResAddressDto[]> {
    return this.userService.getAllAddress();
  }

  //  /:id
  @UseGuards(AuthGuard)
  @Get('/:id')
  getById(@Param('id') id: string): Promise<ResUserDto> {
    return this.userService.getUserById(id);
  }
}
