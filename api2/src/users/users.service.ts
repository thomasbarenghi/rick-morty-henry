import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findFavorites(userId: string) {
    try {
      const user = await this.userRepository.find({
        where: { id: userId },
        relations: ['favorites'],
      });

      return user[0].favorites;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOne({ where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
