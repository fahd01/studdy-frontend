import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AboutComponent } from "./features/public/about/about.component";
import { AddFormationComponent } from "./features/admin/add-formation/add-formation.component";
import { FormationDetailsComponent } from "./features/public/formation/formation-details/formation-details.component";
import { FormationsComponent } from './features/admin/formations/formations.component';
import { EnrollmentComponent } from './features/public/formation/enrollment/enrollment.component';
import { EnrollmentSuccessComponent } from './features/public/formation/enrollment-success/enrollment-success.component';
import { UserEnrollmentsComponent } from './features/public/formation/user-enrollments/user-enrollments.component';
import { AddCouponComponent } from './features/admin/add-coupon/add-coupon.component';
import {FormationListComponent} from "./features/public/formation/list/formation-list.component";


const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin/add-formation', component: AddFormationComponent },
      { path: 'admin/add-coupon', component: AddCouponComponent },

      { path: 'admin/list', component: FormationsComponent },

      { path: 'home', component: HomeComponent },
      { path: 'formations/list', component: FormationListComponent },
      {
        path: 'formations/:id',
        component: FormationDetailsComponent
      },
      { path: 'about', component: AboutComponent },
      { path: 'blog/:id', component: BlogComponent },
      
      // Enrollment routes - IMPORTANT: more specific route must come first!
      { 
        path: 'enrollment/success', 
        component: EnrollmentSuccessComponent 
      },
      { 
        path: 'enrollment/:id', 
        component: EnrollmentComponent
      },
      {
        path: 'enrollments/:email',
        component: UserEnrollmentsComponent
      },
      
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }