import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
addcoupon() {
  this.router.navigate(['/admin/add-coupon']); // Programmatically navigate to dashboard
}
gotoList() {
  this.router.navigate(['/admin/list']); // Programmatically navigate to dashboard
}
  constructor(private router: Router) { }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']); // Programmatically navigate to dashboard
  }

    goToAddFormation() {
      this.router.navigate(['/admin/add-formation']); // Programmatically navigate to dashboard

    }
}
