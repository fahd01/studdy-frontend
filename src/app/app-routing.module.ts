import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import {ListComponent} from "./features/public/course/list/list.component";
import {AboutComponent} from "./features/public/about/about.component";
import { StageFrontOfficeComponent } from './features/Stage/stage-front-office/stage-front-office.component';
import { RegisterComponent } from './features/public/register/register.component';
import { AddStageComponent } from './features/Stage/add-stage/add-stage.component';
import { EditStageComponent } from './features/Stage/edit-stage/edit-stage.component';


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
      { path: '', component: LandingLayoutComponent },
      { path: 'stages', component: StageFrontOfficeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'addstage', component: AddStageComponent },
      { path: 'stage/update/:id', component: EditStageComponent },




      
    
    ]
  },
 
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
