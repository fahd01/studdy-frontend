import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [

      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    
    ]
  },
{
  path: 'admin',
  component: AdminLayoutComponent,
  children: [

    { path: 'dashboard', component: DashboardComponent },
    
    
  
  ]
},
 
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
