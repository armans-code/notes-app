import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { FindNoteInput } from './dto/find-note.input';
import { RemoveNoteInput } from './dto/remove-note.input';
import { AuthService } from 'src/auth/auth.service';
import { NotesGuard } from './notes.guard';

@Injectable()
@UseGuards(NotesGuard)
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>, // @Inject(AuthService)
  ) // private authService: AuthService,
  {}

  async create(createNoteInput: CreateNoteInput) {
    if (createNoteInput.description.length >= 20 && createNoteInput.description.length <= 300) {
      try {
        return this.noteRepository.save(this.noteRepository.create(createNoteInput));
      } catch (error) {
        console.log(error);
      }
    } else return new Error('Note length must be within the 20-300 character range');
  }

  findAllByUserId(userId: string) {
    return this.noteRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findOne(findNoteInput: FindNoteInput) {
    const { id } = findNoteInput;
    const note = await this.noteRepository.findOneBy({ id });
    return note ? note : new Error('No note with that id and/or user found');
  }

  async update(updateNoteInput: UpdateNoteInput) {
    if (updateNoteInput?.description?.length >= 20 && updateNoteInput?.description?.length <= 300) {
      try {
        const { id } = updateNoteInput;
        await this.noteRepository.update({ id }, updateNoteInput);
        return await this.noteRepository.findOneByOrFail({ id });
      } catch (error) {
        return new Error(error);
      }
    } else return new Error('Note length must be within the 20-300 character range');
  }

  async remove(removeNoteInput: RemoveNoteInput) {
    const { id } = removeNoteInput;
    const note = await this.noteRepository.findBy({ id });
    if (note) {
      await this.noteRepository.remove(note);
      return `DELETED NOTE WITH ID ${id}`;
    } else return new Error('No note with that id and/or user found');
  }
}
