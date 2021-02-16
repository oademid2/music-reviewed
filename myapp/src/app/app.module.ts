import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Add this
//import { BehaviorSubject } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserappComponent } from './userapp/userapp.component';

//ADDED
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';

import { getAuthServiceConfigs } from './socialloginConfig';
import { PolicyComponent } from './policy/policy.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserappComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    //BehaviorSubject
  ],
  providers: [
    //SocialLoginModule.initialize(getAuthServiceConfigs)
    {
      provide: AuthServiceConfig,useFactory: getAuthServiceConfigs
}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

