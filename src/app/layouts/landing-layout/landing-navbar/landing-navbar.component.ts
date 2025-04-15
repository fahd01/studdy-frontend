import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.css']
})
export class LandingNavbarComponent implements OnInit{

  private lastScrollTop = 0;
  private navbar: HTMLElement | null = null;

  ngOnInit(): void {
    this.navbar = document.getElementById('ftco-navbar');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.navbar) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      // Scroll down
      this.navbar.classList.add('navbar-scrolled-down');
      this.navbar.classList.remove('navbar-scrolled-up');
    } else {
      // Scroll up
      if (scrollTop > 0) {
        this.navbar.classList.add('navbar-scrolled-up');
        this.navbar.classList.remove('navbar-scrolled-down');
      } else {
        this.navbar.classList.remove('navbar-scrolled-up', 'navbar-scrolled-down');
      }
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }

}
