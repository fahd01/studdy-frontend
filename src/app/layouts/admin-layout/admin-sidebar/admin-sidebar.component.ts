import { Component } from '@angular/core';
import {  Input } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  @Input() isCollapsed = false;
  currentUser = 'Kaysbt';
  currentDateTime = '2025-02-18 22:30:17';
}
