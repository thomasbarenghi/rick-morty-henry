import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotAcceptableException,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const existingUser = await this.usersService.findByEmail(createUserDto.email)
    console.log('existingUser', existingUser);
    if (existingUser) {
      throw new NotAcceptableException();
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  //Post favs
  @Post(':id/favorites')
  addFav(@Body() body: any, @Param('id') id: string) {
    console.log('addFav', body);
    body.userId = id;
    return this.usersService.addFav(body);
  }

  //Delete favs
  @Delete(':id/favorites')
  deleteFav(@Headers() headers: any, @Param('id') id: string) {
    console.log('deleteFav', headers);
    headers.userId = id;
    return this.usersService.deleteFav(headers);
  }
}
