import {Component, OnInit} from '@angular/core';
import {Reclamation} from "../model/Reclamation/reclamation";
import {ReclamationService} from "../services/Reclamation/reclamation.service";

@Component({
  selector: 'app-admin-reclamation',
  templateUrl: './admin-reclamation.component.html',
  styleUrls: ['./admin-reclamation.component.css']
})
export class AdminReclamationComponent implements OnInit {
  reclamations: Reclamation[] = []; // List of all reclamations

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  // Fetch all reclamations
  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
        (data) => {
          this.reclamations = data;

        },
        (error) => {
          console.error('Error fetching reclamations:', error);
        }
    );
  }

    // Confirm and update the status of a reclamation
    confirmUpdateStatus(reclamation: Reclamation): void {
        const confirmation = confirm(`Are you sure you want to change the status to ${reclamation.status}?`);
        if (confirmation) {
            this.updateReclamationStatus(reclamation.recId!, reclamation.status);
        } else {
            // Revert to original status if user cancels
            this.loadReclamations();
        }
    }

    // Update the status of a reclamation
    updateReclamationStatus(id: number, status: string): void {
        // Find the reclamation to update
        const reclamationToUpdate = this.reclamations.find((rec) => rec.recId === id);

        if (!reclamationToUpdate) {
            console.error('Reclamation not found');
            return;
        }

        // Create a new object with the updated status
        const updatedReclamation: Reclamation = {
            recId: reclamationToUpdate.recId,
            description: reclamationToUpdate.description,
            status: status,
            createdAt: reclamationToUpdate.createdAt,
            updatedAt: new Date(),
            user: reclamationToUpdate.user,
        };

        // Call the service to update the reclamation
        this.reclamationService.updateReclamation(id, updatedReclamation).subscribe(
            () => {
                this.loadReclamations(); // Refresh the list after update
            },
            (error) => {
                console.error('Error updating reclamation status:', error);
            }
        );
    }

  // Delete a reclamation
  deleteReclamation(id: number): void {
    this.reclamationService.deleteReclamation(id).subscribe(
        () => {
          this.loadReclamations(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting reclamation:', error);
        }
    );
  }

}