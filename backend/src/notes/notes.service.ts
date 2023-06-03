import { Injectable } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(createNoteInput: CreateNoteInput) {
    if (createNoteInput.description.length > 20 && createNoteInput.description.length < 300)
      return this.noteRepository.save(this.noteRepository.create(createNoteInput));
    else return new Error('Note length must be within the 20-300 character range');
  }

  findAll() {
    return this.noteRepository.find();
  }

  findAllByUserId(userId: string) {
    return this.noteRepository.findBy({ userId });
  }

  findOne(id: string) {
    return this.noteRepository.findOneBy({ id });
  }

  async update(updateNoteInput: UpdateNoteInput) {
    if (updateNoteInput.description.length > 20 && updateNoteInput.description.length < 300) {
      try {
        await this.noteRepository.update({ id: updateNoteInput.id }, updateNoteInput);
        return await this.noteRepository.findOneByOrFail({ id: updateNoteInput.id });
      } catch (error) {
        return new Error(error);
      }
    } else {
      return new Error('Note length must be within the 20-300 character range');
    }
  }

  async remove(id: string) {
    const note = await this.noteRepository.findOneByOrFail({ id });
    await this.noteRepository.remove(note);
    return `DELETED NOTE WITH ID ${id}`;
  }
}
