import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {RegisterComponent} from "./Authentication/register/register.component";
import {LoginComponent} from "./Authentication/login/login.component";
import {PasswordResetComponent} from "./Authentication/password-reset/password-reset.component";
import {UserComponent} from "./user/user.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {UserReclamationComponent} from "./user-reclamation/user-reclamation.component";
import {AdminReclamationComponent} from "./admin-reclamation/admin-reclamation.component";



export const routes: Routes = [

  { path: 'register', component: RegisterComponent }, // Add AuthGuard here if needed
  { path: 'login', component: LoginComponent  }, // Typically, you don’t guard login routes
  { path: 'PasswordReset', component: PasswordResetComponent  }, // Typically, you don’t guard login routes
  { path: 'users', component: UserComponent  }, // Typically, you don’t guard login routes
  { path: 'profile', component: UserSettingsComponent  }, // Typically, you don’t guard login routes
  { path: 'userRec', component: UserReclamationComponent },
  { path: 'adminRec', component: AdminReclamationComponent },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
