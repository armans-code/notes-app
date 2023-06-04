import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Note } from 'src/notes/entities/note.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @OneToMany(() => Note, (note) => note.user)
  @Field(() => [Note], { nullable: true })
  notes: Note[];
}
