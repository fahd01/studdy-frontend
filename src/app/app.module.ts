import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { LandingNavbarComponent } from './layouts/landing-layout/landing-navbar/landing-navbar.component';
import { LandingFooterComponent } from './layouts/landing-layout/landing-footer/landing-footer.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './layouts/admin-layout/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './layouts/admin-layout/admin-footer/admin-footer.component';
import { HomeComponent } from './features/public/home/home.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { RegisterComponent } from './features/public/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './features/public/blog/blog.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { AdminSidebarComponent } from './layouts/admin-layout/admin-sidebar/admin-sidebar.component';
import {CourseService} from "./services/course-managment/course.service";
import { CourseDetailComponent } from './features/public/course/course-detail/course-detail.component';

@NgModule({
  declarations: [
    AppComponent, 
    
    LandingLayoutComponent,
    LandingNavbarComponent,
    LandingFooterComponent,
    AdminLayoutComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    BlogComponent,
    ContactComponent,
    AdminSidebarComponent,
    BlogComponent,
    CourseDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  
  ],
  providers: [
      provideHttpClient(),
      CourseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
