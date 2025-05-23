import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { LandingNavbarComponent } from './layouts/landing-layout/landing-navbar/landing-navbar.component';
import { LandingFooterComponent } from './layouts/landing-layout/landing-footer/landing-footer.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './layouts/admin-layout/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './layouts/admin-layout/admin-footer/admin-footer.component';
import { HomeComponent } from './features/public/home/home.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './features/public/blog/blog.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { AdminSidebarComponent } from './layouts/admin-layout/admin-sidebar/admin-sidebar.component';
import { CourseService} from "./services/course-managment/course.service";
import { CourseDetailComponent } from './features/public/course/course-detail/course-detail.component';
import { CreateCourseComponent } from './features/admin/course/create-course/create-course.component';
import { CourseTableViewComponent } from './features/admin/course/table-view/course-table-view.component';
import { ListComponent} from "./features/public/course/list/list.component";
import { CategoryManagementComponent} from "./features/admin/course/category-management/category-management.component";
import { LiveCourseComponent } from './features/public/course/live-course/live-course.component';
import { QuizManagementComponent} from "./features/admin/course/quiz-management/quiz-management.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService} from "./services/Authenticarion.service";
import { MatCardModule} from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatAutocompleteModule} from "@angular/material/autocomplete";
import { MatDividerModule} from "@angular/material/divider";
import { MatRadioModule} from "@angular/material/radio";
import { MatIconModule} from "@angular/material/icon";
import { CreateModuleComponent } from './features/admin/course/module-management/create-module.component';
import { CourseStatisticsComponent } from './features/admin/course/statistics/course-statistics/course-statistics.component';
import { CommentComponent } from './features/public/comments/comments.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';

// TODO integration; integrate navbar/footer from user management
//import {NavbarComponent} from "./navbar/navbar.component";
//import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {RegisterComponent} from "./features/public/Authentication/register/register.component";
import {LoginComponent} from "./features/public/Authentication/login/login.component";
import {PasswordResetComponent} from "./features/public/Authentication/password-reset/password-reset.component";
import {UserComponent} from "./features/public/user/user.component";
import {PaginationComponent} from "./features/public/pagination/pagination.component";
import {UserSettingsComponent} from "./features/public/user-settings/user-settings.component";
import {LoadingComponent} from "./features/public/loading/loading.component";
import {UnauthorizedComponent} from "./features/public/unauthorized/unauthorized.component";
import {UserReclamationComponent} from "./features/public/user-reclamation/user-reclamation.component";
import {AdminReclamationComponent} from "./features/public/admin-reclamation/admin-reclamation.component";
//import {NgxEmojiPickerModule} from 'ngx-emoji-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import {NavbarComponent} from "./navbar/navbar.component";



import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarComponent } from './features/admin/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EmailComponent } from './features/public/email/email.component';
import { ChartsComponent } from './features/admin/charts/charts.component';
import { ChartsService } from './features/admin/charts/charts.service';

import {AddFormationComponent} from "./features/admin/add-formation/add-formation.component";
import {FileDropPipe} from "../model/FileDropPipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FormationsComponent } from './features/admin/formations/formations.component';
import { EnrollmentComponent } from './features/public/formation/enrollment/enrollment.component';
import { EnrollmentSuccessComponent } from './features/public/formation/enrollment-success/enrollment-success.component';
import { UserEnrollmentsComponent } from './features/public/formation/user-enrollments/user-enrollments.component';
import { AddCouponComponent } from './features/admin/add-coupon/add-coupon.component';


@NgModule({
  declarations: [
    AppComponent,
    // User management
    RegisterComponent ,
    LoginComponent,
    PasswordResetComponent,
    UserComponent ,
    PaginationComponent,
    UserSettingsComponent,
    LoadingComponent,
    UserReclamationComponent ,
    AdminReclamationComponent,

    // Others
    LandingLayoutComponent,
    LandingNavbarComponent,
    LandingFooterComponent,
    AdminLayoutComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    HomeComponent,
    EnrollmentComponent,
    DashboardComponent,

    BlogComponent,
    ContactComponent,
    AdminSidebarComponent,
    BlogDetailsComponent,
    CourseDetailComponent,
    CreateCourseComponent,
    CourseTableViewComponent,
    CategoryManagementComponent,
    QuizManagementComponent,
    LiveCourseComponent,
    CreateModuleComponent,
    CourseStatisticsComponent,
    UserComponent,
    CommentComponent,
    CalendarComponent,
    EmailComponent,
    ChartsComponent,

    FormationsComponent,
    EnrollmentSuccessComponent,
    UserEnrollmentsComponent,
    AddCouponComponent,
    AddFormationComponent,
    FileDropPipe
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ListComponent,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatRadioModule,
    FormsModule,
    NgbModule,
    // TODO integration integrate navbar and footer like done for user management
    //NavbarComponent,
    //FooterComponent,
    // From User management
    // TODO integration integrate with navbar/footer
    //NavbarComponent,
    PickerModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideHttpClient(),
    CourseService,
    AuthenticationService,
    ChartsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
