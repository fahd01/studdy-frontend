import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { TranslationService } from './services/Translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isPasswordResetPage: boolean = false;

  constructor(private router: Router,private translationService: TranslationService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update flags based on the current route
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/register';
        this.isPasswordResetPage = event.url.includes('/PasswordReset');

        // Debug statements to verify flag updates
        console.log(`isLoginPage: ${this.isLoginPage}`);
        console.log(`isRegisterPage: ${this.isRegisterPage}`);
        console.log(`isPasswordResetPage: ${this.isPasswordResetPage}`);
      }
    });


    const savedLang = localStorage.getItem('userLang') || 
    navigator.language.split('-')[0] || 
    'fr';
this.translationService.translateApp(savedLang);
  }
}