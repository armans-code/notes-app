import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { FindNoteInput } from './dto/find-note.input';
import { RemoveNoteInput } from './dto/remove-note.input';
@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.notesService.create(createNoteInput);
  }

  @Query(() => [Note], { name: 'notes' })
  findAll() {
    return this.notesService.findAll();
  }

  @Query(() => Note, { name: 'note' })
  findOne(@Args('findNoteInput') findNoteInput: FindNoteInput) {
    return this.notesService.findOne(findNoteInput);
  }

  @Mutation(() => Note)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput);
  }

  @Mutation(() => String)
  removeNote(@Args('removeNoteInput') removeNoteInput: RemoveNoteInput) {
    return this.notesService.remove(removeNoteInput);
  }
}
