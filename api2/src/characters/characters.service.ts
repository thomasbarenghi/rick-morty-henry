import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
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
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}
  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const newCharacter = this.characterRepository.create(createCharacterDto);
      return await this.characterRepository.save(newCharacter);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException({
        error: 'Error al crear el personaje.',
      });
    }
  }

  async findAll(req: any): Promise<any> {
    try {
      const userId = req.userid;
      let userCharacters = [];
      let favorites = [];
      let apiFavorites = [];

      const rickApi = this.configService.get<string>('RICK_API_URL');
      const rickObservable = this.httpService.get(`${rickApi}`);
      const rickCharactersResponse = await rickObservable.toPromise();
      const rickCharacters = rickCharactersResponse.data.results;

      if (userId) {
        userCharacters = await this.characterRepository.find({
          where: {
            userId: userId,
          },
        });

        const response = await this.userService.findFavorites(userId);
        favorites = response.favorites;

        apiFavorites = rickCharacters.filter((character) => {
          return response.apiFavorites.includes(character.id.toString());
        });

        favorites = favorites.concat(apiFavorites);
        console.log('userCharacters', userCharacters, favorites);
      }

      return {
        apiCharacters: rickCharacters,
        userCharacters: userCharacters,
        userFavorites: favorites,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException({
        error: 'Error al obtener los personajes.',
      });
    }
  }

  async findOne(id: string) {
    console.log('id findOne', id);
    try {
      const hasLetter = /[a-zA-Z]/;
      if (hasLetter.test(id)) {
        return await this.characterRepository.findOne({
          where: { id: id },
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
      throw new InternalServerErrorException({
        error: 'Error al obtener el personaje.',
      });
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
      throw new InternalServerErrorException({
        error: 'Error al eliminar el personaje.',
      });
    }
  }
}
