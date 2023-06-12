import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { AuthModule } from 'src/auth/auth.module';
import { NotesGuard } from './notes.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), AuthModule],
  providers: [NotesResolver, NotesService],
  exports: [NotesService],
})
export class NotesModule {}
