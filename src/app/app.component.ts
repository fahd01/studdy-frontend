import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-management';
  private lastScrollTop = 0;
  constructor(private router: Router, private renderer: Renderer2) {}

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

    this.lastScrollTop = Math.max(st, 0); }

  isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
}