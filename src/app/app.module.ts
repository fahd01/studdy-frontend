import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {RegisterComponent} from "./Authentication/register/register.component";
import {LoginComponent} from "./Authentication/login/login.component";
import {PasswordResetComponent} from "./Authentication/password-reset/password-reset.component";
import {UserComponent} from "./user/user.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {LoadingComponent} from "./loading/loading.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {UserReclamationComponent} from "./user-reclamation/user-reclamation.component";
import {AdminReclamationComponent} from "./admin-reclamation/admin-reclamation.component";
import {NgxEmojiPickerModule} from 'ngx-emoji-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent ,
      LoginComponent,
    PasswordResetComponent,
    UserComponent ,
    PaginationComponent,
      UserSettingsComponent,
      LoadingComponent,
UserReclamationComponent ,
      AdminReclamationComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,PickerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
      provideHttpClient(),

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
