import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  //funtion untuk login guna email & password
  //"signInWithEmailAndPassword" memang da ada
  userLogin(newEmail: string, newPassword: string): Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  //function untuk reset password user
  //"sendPasswordResetEmail" memang da ada
  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  //funtion untuk user logout, da ada login mesti ada logout kan
  //"signOut" memang da ada
  userLogout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  //function untuk user register baru
  //"createUserWithEmailAndPassword" memang da ada
  userRegister(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }
}
