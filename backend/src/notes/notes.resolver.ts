import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
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
  findOne(@Args('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Mutation(() => Note)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput);
  }

  @Mutation(() => String)
  removeNote(@Args('id') id: string) {
    return this.notesService.remove(id);
  }
}
