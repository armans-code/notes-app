import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as firebase from 'firebase-admin';
import { UsersService } from 'src/users/users.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Note } from './entities/note.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class NotesGuard implements CanActivate {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @Inject(AuthService)
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const accessToken = ctx.getContext().req.headers['authorization'].split(' ')[1];
    const noteId = context.getArgs()[1][Object.keys(context.getArgs()[1])[0]].id;
    const note = await this.notesRepository.findOneBy({ id: noteId });
    console.log(note.userId == (await this.authService.getUserId(accessToken)));
    return note.userId == (await this.authService.getUserId(accessToken));
  }
}
