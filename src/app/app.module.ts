import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { LandingNavbarComponent } from './layouts/landing-layout/landing-navbar/landing-navbar.component';
import { LandingFooterComponent } from './layouts/landing-layout/landing-footer/landing-footer.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './layouts/admin-layout/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './layouts/admin-layout/admin-footer/admin-footer.component';
import { HomeComponent } from './features/public/home/home.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { RegisterComponent } from './features/public/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './features/public/blog/blog.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { AdminSidebarComponent } from './layouts/admin-layout/admin-sidebar/admin-sidebar.component';
 
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './features/public/comments/comments.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarComponent } from './features/admin/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EmailComponent } from './features/public/email/email.component';
import { ChartsComponent } from './features/admin/charts/charts.component';
import { ChartsService } from './features/admin/charts/charts.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {NgxEmojiPickerModule} from 'ngx-emoji-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import {RouterModule} from "@angular/router";





@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent ,
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
     CommentComponent,
    BlogDetailsComponent,
    CalendarComponent,
    EmailComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    PickerModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    RouterModule.forRoot(routes)

  
  ],
  providers: [ChartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 