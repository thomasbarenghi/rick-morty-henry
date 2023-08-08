import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  IsNull,
} from 'typeorm';
import { Character } from 'src/characters/entities/character.entity';
import { isNull } from 'util';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', array: true, default: [] })
  apiFavorites: string[];

  @OneToMany(() => Character, (character) => character.userId, {
    cascade: true,
  })
  characters: Character[];

  @ManyToMany(() => Character, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  @JoinTable({
    name: 'user_character',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
  })
  favorites: Character[];

  //array de strings
}
