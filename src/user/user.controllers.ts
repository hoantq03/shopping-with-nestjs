import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, AuthGuard } from 'src/guard';
import {
  ReqAddAddress,
  ReqFindAllUserDto,
  ReqFindUserByEmailDto,
  ReqUpdateUserDto,
  ReqUserStatusDto,
  ResAddressDto,
  ResUserDto,
} from './dto';
import { UserServices } from './user.services';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  @UseGuards(AdminGuard)
  @Post('/get-all-users')
  async getAllUser(@Body() body: ReqFindAllUserDto): Promise<ResUserDto[]> {
    return this.userService.getAllUser(body);
  }

  @Post('/find-by-email')
  async findByEmail(@Body() body: ReqFindUserByEmailDto): Promise<ResUserDto> {
    return await this.userService.getUserByEmail(body.email);
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  async changeStatusUser(
    @Param('id') id: string,
    @Body() body: ReqUserStatusDto,
  ): Promise<ResUserDto> {
    return this.userService.changeStatusUser(id, body);
  }

  @UseGuards(AdminGuard)
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

  // confused
  @UseGuards(AuthGuard)
  @Post('/delete-address/:id')
  async deleteAddress(@Param() param: any, @Body() body: any) {
    const addressId: string = param.id;
    const { userId } = body;
    return this.userService.deleteAddress(addressId, userId);
  }
}
