import {
  Injectable,
  forwardRef,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword } from '../utils/bcrypt.utils';
import { CharactersService } from 'src/characters/characters.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => CharactersService))
    private charactersService: CharactersService,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await encryptPassword(createUserDto.password);
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        error: 'Error al crear el usuario.',
      });
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException({
        error: 'Error al obtener los usuarios.',
      });
    }
  }

  async findFavorites(userId: string) {
    try {
      const user = await this.userRepository.find({
        where: { id: userId },
        relations: ['favorites'],
      });
      console.log('user findFavorites', user);
      return {
        favorites: user[0].favorites,
        apiFavorites: user[0].apiFavorites,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        error: 'Error al obtener los personajes favoritos.',
      });
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException({
        error: 'Error al obtener el usuario.',
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException({
        error: 'Error al eliminar el usuario.',
      });
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async addFav(body: any) {
    try {
      console.log('addFav Service', body);
      const userId = body.userId;
      const characterId = body.characterId;

      console.log('userId', userId, 'characterId', characterId);

      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favorites'],
      });

      const letterCheck = /[a-zA-Z]/;
      const hasLetter = letterCheck.test(characterId);
      const character = await this.charactersService.findOne(characterId);

      if (hasLetter) {
        user.favorites.push(character);
      } else {
        user.apiFavorites.push(characterId);
      }

      await this.userRepository.save(user);

      //respondemos con el character
      return character;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        error: 'Error al agregar el personaje a favoritos.',
      });
    }
  }

  async deleteFav(headers: any) {
    try {
      console.log('deleteFav Service', headers);
      const userId = headers.userId;
      const characterId = headers.characterid;
      console.log('deleteFav userId', userId, 'characterId', characterId);
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favorites'],
      });

      const character = await this.charactersService.findOne(characterId);

      user.favorites = user.favorites.filter(
        (fav) => fav?.id !== character?.id,
      );

      await this.userRepository.save(user);
      return character;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        error: 'Error al eliminar el personaje de favoritos.',
      });
    }
  }
}
