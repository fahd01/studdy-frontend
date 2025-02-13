import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './modules/landing/components/navbar/navbar.component';
import { FooterComponent } from './modules/landing/components/footer/footer.component';
import { HeaderComponent } from './modules/landing/components/header/header.component';
import { MainContentComponent } from './modules/landing/components/main-content/main-content.component';
import { MainContentDashbordComponent } from './modules/dashbord/components/main-content-dashbord/main-content-dashbord.component';
import { FooterDashbordComponent } from './modules/dashbord/components/footer-dashbord/footer-dashbord.component';

@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent,
    FooterComponent,
    MainContentComponent
    

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
