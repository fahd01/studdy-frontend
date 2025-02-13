import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './modules/landing/components/main-content/main-content.component';

const routes: Routes = [
  {
    path: '/landing', component: MainContentComponent
  },
  { path: '/dashboard', loadChildren: () => import('./modules/dashbord/dashbord.module').then(m => m.DashbordModule) }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
