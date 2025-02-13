import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';

import { NavbarDashbordComponent } from './components/navbar-dashbord/navbar-dashbord.component';
import { FooterDashbordComponent } from './components/footer-dashbord/footer-dashbord.component';
import { MainContentDashbordComponent } from './components/main-content-dashbord/main-content-dashbord.component';


@NgModule({
  declarations: [

    NavbarDashbordComponent,
    FooterDashbordComponent,
    MainContentDashbordComponent
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule
  ]
})
export class DashbordModule { }
