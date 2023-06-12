import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as firebase from 'firebase-admin';

@Injectable()
export class AuthService {
  private firebaseApp: firebase.app.App;
  constructor() {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(
        'PATH_TO_CREDS',
      ),
    });
  }

  async registerFirebaseUser(uid: string, email: string, password: string) {
    return await this.firebaseApp
      .auth()
      .createUser({ uid, email, password })
      .catch(async (e) => {
        return new Error(e);
      });
  }

  async getUserId(accessToken: string) {
    return await this.firebaseApp
      .auth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        return uid;
      });
  }
}
