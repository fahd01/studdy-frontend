import { Component, HostListener, Renderer2 } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { TranslationService } from './services/Translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Studdy Learning Platform';
  private lastScrollTop = 0;

  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isPasswordResetPage: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private translationService: TranslationService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('ftco-navbar');

    if (st > this.lastScrollTop) {
      // Scroll Down
      this.renderer.removeClass(navbar, 'navbar-scrolled-up');
      this.renderer.addClass(navbar, 'navbar-scrolled-down');
    } else {
      // Scroll Up
      this.renderer.removeClass(navbar, 'navbar-scrolled-down');
      this.renderer.addClass(navbar, 'navbar-scrolled-up');
    }

    this.lastScrollTop = Math.max(st, 0);
  }

  isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }

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
