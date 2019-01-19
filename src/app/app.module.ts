import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyByOL2s_W8D2DqK4n-ebIzCfnx95oLmqkk",
      authDomain: "simplestickies-2b370.firebaseapp.com",
      databaseURL: "https://simplestickies-2b370.firebaseio.com",
      projectId: "simplestickies-2b370",
      storageBucket: "simplestickies-2b370.appspot.com",
      messagingSenderId: "812842566199"
    }),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
