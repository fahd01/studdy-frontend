import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';
import {ListComponent} from "./features/public/course/list/list.component";
import {AboutComponent} from "./features/public/about/about.component";
import {CourseDetailComponent} from "./features/public/course/course-detail/course-detail.component";
import {CreateCourseComponent} from "./features/admin/course/create-course/create-course.component";
import {CourseTableViewComponent} from "./features/admin/course/table-view/course-table-view.component";
import {CategoryManagementComponent} from "./features/admin/course/category-management/category-management.component";
import {LiveCourseComponent} from "./features/public/course/live-course/live-course.component";
import {QuizManagementComponent} from "./features/admin/course/quiz-management/quiz-management.component";
import {CreateModuleComponent} from "./features/admin/course/module-management/create-module.component";
import {
  CourseStatisticsComponent
} from "./features/admin/course/statistics/course-statistics/course-statistics.component";
import { CommentComponent } from './features/public/comments/comments.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';

import { CalendarComponent } from './features/admin/calendar/calendar.component';
import { EmailComponent } from './features/public/email/email.component';
import { ChartsComponent } from './features/admin/charts/charts.component';

// User management
import {RegisterComponent} from "./features/public/Authentication/register/register.component";
import {LoginComponent} from "./features/public/Authentication/login/login.component";
import {PasswordResetComponent} from "./features/public/Authentication/password-reset/password-reset.component";
import {UserComponent} from "./features/public/user/user.component";
import {UserSettingsComponent} from "./features/public/user-settings/user-settings.component";
import {UserReclamationComponent} from "./features/public/user-reclamation/user-reclamation.component";
import {AdminReclamationComponent} from "./features/public/admin-reclamation/admin-reclamation.component";



export const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blogs/:id', component: BlogDetailsComponent },
      { path: 'comment', component: CommentComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'send-email', component: EmailComponent },

      { path: 'course/list', component: ListComponent },
      { path: 'course/:id/module/:moduleId/live', component: LiveCourseComponent },
      { path: 'course/:id', component: CourseDetailComponent },
      { path: 'about', component: AboutComponent },

      // User management routes
      { path: 'register', component: RegisterComponent }, // Add AuthGuard here if needed
      { path: 'login', component: LoginComponent  }, // Typically, you don’t guard login routes
      { path: 'PasswordReset', component: PasswordResetComponent  }, // Typically, you don’t guard login routes
      { path: 'users', component: UserComponent  }, // Typically, you don’t guard login routes
      { path: 'profile', component: UserSettingsComponent  }, // Typically, you don’t guard login routes
      { path: 'userRec', component: UserReclamationComponent },
      { path: 'adminRec', component: AdminReclamationComponent },

      { path: '', redirectTo: '/home', pathMatch: 'full' }

    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'course/create', component: CreateCourseComponent },
      { path: 'course/edit/:id', component: CreateCourseComponent },
      { path: 'course/table-view', component: CourseTableViewComponent },
      { path: 'course/category', component: CategoryManagementComponent },
      { path: 'course/category/edit/:id', component: CategoryManagementComponent },
      { path: 'course/quiz', component: QuizManagementComponent },
      { path: 'course/statistics', component: CourseStatisticsComponent },
      { path: 'course/modules', component: CreateModuleComponent },
      { path: 'course/:id/modules', component: CreateModuleComponent },
      // BLog Management
      { path: 'charts', component: ChartsComponent },
      { path: 'calendar', component: CalendarComponent }
    ]
  }
];

const config: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'top'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
