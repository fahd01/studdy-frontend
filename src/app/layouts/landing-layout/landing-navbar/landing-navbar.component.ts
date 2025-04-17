import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import {Historic} from "../../../models/Historic";
import {RegisterService} from "../../../services/Register/register.service";
import {TranslationService} from "../../../services/Translation/translation.service";
import {HistoryService} from "../../../services/History/history.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-landing-navbar',
  //standalone: true, // TODO integration; user management; ??
  //imports: [CommonModule],
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.css']
})
export class LandingNavbarComponent implements OnInit{

  private lastScrollTop = 0;
  private navbar: HTMLElement | null = null;

  userRole: string = ''; // Initialize with a default value
  // Define the inactivity time (X minutes in milliseconds)
  private inactivityTime = 300000; // 5 minutes
  private timeoutId: any;
  currentLang = 'eng'; // Langue par défaut
  history: Historic[] = []; // List of user's reclamations
  historyCard:boolean = false; // Flag to control the visibility of the history card

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
    ,private translationService: TranslationService,
    private renderer: Renderer2,
    private el: ElementRef,private historyService:HistoryService
  ) {}


  ngOnInit(): void {
    this.navbar = document.getElementById('ftco-navbar');

    this.userRole = sessionStorage.getItem('role') ?? ''; // Get the role from sessionStorage
    console.log('User Role:', this.userRole); // Debugging
    this.cdr.detectChanges(); // Force change detection
    this.startInactivityTimer();
    this.loadHistory(); // Load the user's reclamations on component initialization
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

  logout(): void {
    this.registerService.logout();
    this.router.navigate(['/login']);
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');
    localStorage.removeItem('authToken'); // Clear the auth token from localStorage
  }


  startInactivityTimer() {
    this.resetInactivityTimer();
  }

  // Réinitialiser le timer d'inactivité
  resetInactivityTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.showInactivityAlert();
    }, this.inactivityTime);
  }

  // Afficher l'alerte d'inactivité
  showInactivityAlert() {
    this.logout(); // Call the logout method to log the user out
  }

  // Détecter l'activité de la souris
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.resetInactivityTimer();
  }

  // Détecter l'activité du clavier
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.resetInactivityTimer();
  }

  async changeLanguage(lang: string) {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      await this.translationService.translateApp(lang);
      // Sauvegarder la préférence de langue
      localStorage.setItem('userLang', lang);
    }
  }

  // Fetch the logged-in user's ID from session storage
  getUserId(): number {
    const userId = sessionStorage.getItem('userId');
    console.log('User ID from session storage:', userId); // Debug statement
    if (!userId) {
      console.error('User ID not found in session storage');
      return 0;
    }
    return +userId; // Convert to number
  }
  // Fetch all reclamations for the logged-in user from backend
  loadHistory(): void {
    const userId = this.getUserId();
    if (userId === 0) {
      console.error('User ID not found in session storage');
      return;
    }

    this.historyService.getHistoryByUser(userId).subscribe(
      (data) => {
        console.log('User history:', data); // Debugging
        this.history = data;
      },
      (error) => {
        console.error('Error fetching history:', error);
      }
    );
  }

  openCardHistory() {
    console.log('History card opened'); // Debugging
    this.historyCard = true; // Show the history card
  }

  closeCard() {
    console.log('History card closed'); // Debugging
    this.historyCard = false; // Hide the history card
  }

  // User management menu dropdown
  dropdownOpen = false;
  toggleDropdown(event: Event) {
    event.preventDefault(); // Prevents "#" from scrolling to top
    this.dropdownOpen = !this.dropdownOpen;
  }

}
