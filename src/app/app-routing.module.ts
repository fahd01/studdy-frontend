import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import {ListComponent} from "./features/public/course/list/list.component";
import {AboutComponent} from "./features/public/about/about.component";


const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'course/list', component: ListComponent },
      { path: 'about', component: AboutComponent },
      { path: 'blog/:id', component: BlogComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    
    ]
  },
 
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
