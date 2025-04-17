import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormationService } from 'src/app/services/formation.service';
import { Formation } from 'src/app/models/Model';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  formations: Formation[] = [];
  loading = false;
  error = '';
  currentUser = 'iitsMahdi';
  currentDateTime = '2025-03-13 00:29:10';
  searchTerm = '';

  constructor(
    private formationService: FormationService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.loading = true;
    this.error = '';

    this.formationService.getAllFormations()
      .pipe(
        catchError(error => {
          console.error('Error loading formations:', error);
          this.error = 'Failed to load formations. Please try again later.';
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(formations => {
        this.formations = formations;
      });
  }

  deleteFormation(id: number): void {
    if (confirm('Are you sure you want to delete this formation?')) {
      this.loading = true;

      this.formationService.deleteFormation(id)
        .pipe(
          catchError(error => {
            console.error('Error deleting formation:', error);
            this.error = 'Failed to delete formation. Please try again later.';
            return of(null);
          }),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(() => {
          this.formations = this.formations.filter(f => f.id !== id);
          alert('Formation deleted successfully!');
        });
    }
  }

  editFormation(id: number): void {
    this.router.navigate(['/admin/formations/edit', id]);
  }

  createNewFormation(): void {
    this.router.navigate(['/admin/formations/create']);
  }

  get filteredFormations(): Formation[] {
    if (!this.searchTerm.trim()) {
      return this.formations;
    }

    const term = this.searchTerm.toLowerCase();
    return this.formations.filter(formation => {
      return formation.title.toLowerCase().includes(term) ||
             (formation.description && formation.description.toLowerCase().includes(term));
    });
  }
}
