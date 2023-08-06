import { Module, forwardRef } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from './entities/character.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    HttpModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
