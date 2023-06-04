import { Injectable } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { FindNoteInput } from './dto/find-note.input';
import { RemoveNoteInput } from './dto/remove-note.input';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(createNoteInput: CreateNoteInput) {
    if (createNoteInput.description.length >= 20 && createNoteInput.description.length <= 300) {
      try {
        return this.noteRepository.save(this.noteRepository.create(createNoteInput));
      } catch (error) {
        console.log(error);
      }
    } else return new Error('Note length must be within the 20-300 character range');
  }

  findAll() {
    return this.noteRepository.find();
  }

  findAllByUserId(userId: string) {
    return this.noteRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findOne(findNoteInput: FindNoteInput) {
    const { id, userId } = findNoteInput;
    const user = await this.noteRepository.findOneBy({ id, userId });
    return user ? user : new Error('No note with that id and/or user found');
  }

  async update(updateNoteInput: UpdateNoteInput) {
    if (updateNoteInput?.description?.length >= 20 && updateNoteInput?.description?.length <= 300) {
      try {
        const { id, userId } = updateNoteInput;
        await this.noteRepository.update({ id, userId }, updateNoteInput);
        return await this.noteRepository.findOneByOrFail({ id, userId });
      } catch (error) {
        return new Error(error);
      }
    } else return new Error('Note length must be within the 20-300 character range');
  }

  async remove(removeNoteInput: RemoveNoteInput) {
    const { id, userId } = removeNoteInput;
    const note = await this.noteRepository.findBy({ id, userId });
    if (note) {
      await this.noteRepository.remove(note);
      return `DELETED NOTE WITH ID ${id}`;
    } else return new Error('No note with that id and/or user found');
  }
}
