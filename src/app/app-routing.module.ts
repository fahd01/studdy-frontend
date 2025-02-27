import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'course/list', component: ListComponent },
      { path: 'course/:id', component: CourseDetailComponent },
      { path: 'about', component: AboutComponent },
      // TODO remove { path: 'blog/:id', component: BlogComponent },
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
      { path: 'course/category/edit/:id', component: CategoryManagementComponent }
    ]
  }

];

@NgModule({
  
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' } ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
