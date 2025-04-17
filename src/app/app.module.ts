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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BlogComponent } from './features/public/blog/blog.component';
import {CourseService} from "./services/course-managment/course.service";
import {AddFormationComponent} from "./features/admin/add-formation/add-formation.component";
import {FileDropPipe} from "../model/FileDropPipe";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FormationsComponent } from './features/admin/formations/formations.component';
import { EnrollmentComponent } from './features/public/course/enrollment/enrollment.component';
import { EnrollmentSuccessComponent } from './features/public/course/enrollment-success/enrollment-success.component';
import { UserEnrollmentsComponent } from './features/public/course/user-enrollments/user-enrollments.component';
import { AddCouponComponent } from './features/admin/add-coupon/add-coupon.component';

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
    EnrollmentComponent,
    DashboardComponent,
    RegisterComponent,
    FormationsComponent,
    EnrollmentSuccessComponent,
    UserEnrollmentsComponent,
    AddCouponComponent,
    BlogComponent,
    AddFormationComponent,
    FileDropPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
      FormsModule,    NgbModule,



  ],
  providers: [
      provideHttpClient(),
      CourseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
