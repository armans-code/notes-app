import { Resolver, ResolveField, Parent, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { NotesService } from 'src/notes/notes.service';
import { UseGuards } from '@nestjs/common';
import { NotesGuard } from 'src/notes/notes.guard';
import { AuthService } from 'src/auth/auth.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly notesService: NotesService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [User])
  notes(@Parent() user: User) {
    return this.notesService.findAllByUserId(user.id);
  }
}
