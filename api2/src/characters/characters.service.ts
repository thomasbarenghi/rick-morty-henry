import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios/dist';
import { ConfigService } from '@nestjs/config';
import { Character } from './entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}
  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const newCharacter = this.characterRepository.create(createCharacterDto);
      return await this.characterRepository.save(newCharacter);
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al crear el personaje.' };
    }
  }

  async findAll(req: any): Promise<any> {
    try {
      const userId = req.body.userId;
      let userCharacters = [];
      let favorites = [];

      if (userId) {
        userCharacters = await this.characterRepository.find({
          where: {
            userId: userId,
          },
        });
        favorites = await this.userService.findFavorites(userId);
      }

      const rickApi = this.configService.get<string>('RICK_API_URL');
      const rickObservable = this.httpService.get(`${rickApi}`);
      const rickCharactersResponse = await rickObservable.toPromise();
      const rickCharacters = rickCharactersResponse.data.results;

      return {
        apiCharacters: rickCharacters,
        userCharacters: userCharacters,
        userFavorites: favorites,
      };
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener los personajes.' };
    }
  }

  async findOne(id: string) {
    try {
      const hasLetter = /[a-zA-Z]/;
      if (hasLetter.test(id)) {
        return await this.characterRepository.findOne({
          where: { name: id },
        });
      } else {
        const rickApi = this.configService.get<string>('RICK_API_URL');
        const rickObservable = this.httpService.get(`${rickApi}/${id}`);
        const rickCharactersResponse = await rickObservable.toPromise();
        const rickCharacter = rickCharactersResponse.data;

        return rickCharacter;
      }
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener el personaje.' };
    }
  }

  async remove(id: string) {
    try {
      const character = await this.characterRepository.findOne({
        where: { id: id },
      });
      return await this.characterRepository.remove(character);
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al eliminar el personaje.' };
    }
  }
}
