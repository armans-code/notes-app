import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private firebaseApp: firebase.app.App;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert('PATH_TO_FIREBASE_JSON'),
    });
  }

  async create(createUserInput: CreateUserInput) {
    const { email, firstName, lastName, password } = createUserInput;
    if ((await this.userRepository.findBy({ email })).length > 0)
      return new Error('User with that email already exists!');
    else {
      const id = randomUUID();
      await this.firebaseApp
        .auth()
        .createUser({
          uid: id,
          email,
          password,
        })
        .catch(async (e) => {
          return new Error(e);
        });
      return await this.userRepository.save({ id, email, firstName, lastName });
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneByOrFail({ id });
  }
}
