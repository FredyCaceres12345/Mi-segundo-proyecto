import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() =>
     initializeApp({"projectId":"lenguajeprgv-392d6","appId":"1:1092730573957:web:41b47d8a966b6b102605ec",
     "storageBucket":"lenguajeprgv-392d6.appspot.com","apiKey":"AIzaSyAw0SpQFzg5E9QXNILOayB7vxiLOpmeyxI",
     "authDomain":"lenguajeprgv-392d6.firebaseapp.com","messagingSenderId":"1092730573957"})),
     provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
     provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()),
     providePerformance(() => getPerformance()), provideStorage(() => getStorage()),
     provideRemoteConfig(() => getRemoteConfig())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
