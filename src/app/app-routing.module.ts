import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';

import { CommentComponent } from './features/public/comments/comments.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { CalendarComponent } from './features/admin/calendar/calendar.component';
import { EmailComponent } from './features/public/email/email.component';

import { ChartsComponent } from './features/admin/charts/charts.component';
 
export const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [

      { path: 'comment', component: CommentComponent },
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blogs/:id', component: BlogDetailsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'send-email', component: EmailComponent },
      
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    
    ]
  },
{
  path: 'admin',
  component: AdminLayoutComponent,
  children: [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'charts', component: ChartsComponent },
    { path: 'calendar', component: CalendarComponent }
    
    
  
  ]
},
 
];


const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
