import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { email, firstName, lastName, password } = createUserInput;
    if ((await this.userRepository.findBy({ email })).length > 0)
      return new Error('User with that email already exists!');
    else {
      const id = randomUUID();
      await this.authService.registerFirebaseUser(id, email, password);
      return await this.userRepository.save({ id, email, firstName, lastName });
    }
  }

  findOne(id: string) {
    return this.userRepository.findOneByOrFail({ id });
  }
}
