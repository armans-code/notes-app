import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { NotesModule } from 'src/notes/notes.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotesModule, AuthModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
