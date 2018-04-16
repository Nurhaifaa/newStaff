import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

//import AF2 module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

//AF2 setting
export const firebaseConfig = {
  apiKey: "AIzaSyCQlwk_A7gIJS5N07nQusr6HC488gW4A5E",
  authDomain: "staff-836e3.firebaseapp.com",
  databaseURL: "https://staff-836e3.firebaseio.com",
  projectId: "staff-836e3",
  storageBucket: "staff-836e3.appspot.com",
  messagingSenderId: "809752113783"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
