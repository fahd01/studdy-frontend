import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout/landing-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';

import { CommentComponent } from './features/public/comments/comments.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { CalendarComponent } from './features/admin/calendar/calendar.component';


const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [

      { path: 'comment', component: CommentComponent },
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blogs/:id', component: BlogDetailsComponent },
      { path: 'contact', component: ContactComponent },
      
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    
    ]
  },
{
  path: 'admin',
  component: AdminLayoutComponent,
  children: [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'calendar', component: CalendarComponent }
    
    
  
  ]
},
 
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
