import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { FindNoteInput } from './dto/find-note.input';
import { RemoveNoteInput } from './dto/remove-note.input';
import { UseGuards } from '@nestjs/common';
import { NotesGuard } from './notes.guard';
@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.notesService.create(createNoteInput);
  }

  @Query(() => Note, { name: 'note' })
  @UseGuards(NotesGuard)
  findOne(@Args('findNoteInput') findNoteInput: FindNoteInput) {
    return this.notesService.findOne(findNoteInput);
  }

  @Mutation(() => Note)
  @UseGuards(NotesGuard)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput);
  }

  @Mutation(() => String)
  @UseGuards(NotesGuard)
  removeNote(@Args('removeNoteInput') removeNoteInput: RemoveNoteInput) {
    return this.notesService.remove(removeNoteInput);
  }
}
