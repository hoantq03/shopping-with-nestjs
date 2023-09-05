import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, CustomerGuard } from 'src/auth/guard';
import {
  ReqAddAddress,
  ReqFindAllUserDto,
  ReqFindUserByEmailDto,
  ReqSetAddressDefault,
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
  @Post('/getAllUsers')
  async getAllUser(@Body() body: ReqFindAllUserDto): Promise<ResUserDto[]> {
    return this.userService.getAllUser(body);
  }

  @Post('/getByEmail')
  async getUserByEmail(
    @Body() body: ReqFindUserByEmailDto,
  ): Promise<ResUserDto> {
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

  @UseGuards(CustomerGuard)
  @Post('/addAddress')
  async addAddress(@Body() body: ReqAddAddress): Promise<ResAddressDto> {
    return this.userService.addAddress(body);
  }

  @UseGuards(CustomerGuard)
  @Get('/getAllAddress')
  async getAllAddress(): Promise<ResAddressDto[]> {
    return this.userService.getAllAddress();
  }

  @UseGuards(CustomerGuard)
  @Get('/getAddress')
  async getAddress(@Body() body: any): Promise<ResAddressDto[]> {
    const { userId } = body;
    return this.userService.getAddress(userId);
  }

  //  /:id
  @UseGuards(CustomerGuard)
  @Get('/:id')
  getById(@Param('id') id: string): Promise<ResUserDto> {
    return this.userService.getUserById(id);
  }

  // confused
  @UseGuards(CustomerGuard)
  @Delete('/deleteAddress/:id')
  async deleteAddress(@Param() param: any, @Body() body: any): Promise<object> {
    const addressId: string = param.id;
    const { userId } = body;
    return this.userService.deleteAddress(addressId, userId);
  }

  @UseGuards(CustomerGuard)
  @Put('/address/setDefaultAddress')
  async setDefaultAddress(@Body() body: ReqSetAddressDefault): Promise<any> {
    console.log(body);
    // return this.userService.setDefaultAddress();
  }
}
