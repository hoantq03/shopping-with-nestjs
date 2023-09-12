import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, CustomerGuard } from '../auth/guard';
import { ApiKeyV1 } from '../guards/checkApiKey';
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

@UseGuards(ApiKeyV1)
@Controller('/apiV1/users')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  @UseGuards(AdminGuard)
  @Get('/getAllUsers')
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

  @UseGuards(AdminGuard)
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

  // confused
  @UseGuards(CustomerGuard)
  @Delete('/deleteAddress/:id')
  async deleteAddress(@Param() param: any, @Body() body: any): Promise<object> {
    const addressId: string = param.id;
    const { userId } = body;
    return this.userService.deleteAddress(addressId, userId);
  }

  //  /:id
  @UseGuards(CustomerGuard)
  @Get('/getAddress/:id')
  getById(@Param('id') id: string): Promise<ResAddressDto> {
    return this.userService.getOneAddress(id);
  }
}
