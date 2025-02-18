import { Component } from '@angular/core';
import {  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  // Method to emit toggle event
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
