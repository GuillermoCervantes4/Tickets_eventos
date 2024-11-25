import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
///////// importar firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

///////// importar httopclient module de forma global
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgModel, ReactiveFormsModule } from '@angular/forms';

///// para login y registro ////
import { Auth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, ReactiveFormsModule,  AngularFireAuthModule,
      CommonModule),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBvLA_g4YS5epMAczwoPS3tD4s3qnwppws",
      authDomain: "tickets-eventos-197f5.firebaseapp.com",
      projectId: "tickets-eventos-197f5",
      storageBucket: "tickets-eventos-197f5.firebasestorage.app",
      messagingSenderId: "261316245528",
      appId: "1:261316245528:web:62347db28444acb2faab6d",
      measurementId: "G-D4D1ZWR46N"
    })),
    ////// para login y registro
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient()
  ]
};
