import { Component, OnInit } from '@angular/core';
import { Stage } from 'src/app/models/Stage';
import { StageService } from 'src/app/services/stage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel

@Component({
  selector: 'app-stage-front-office',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  // Include FormsModule
  templateUrl: './stage-front-office.component.html',
  styleUrls: ['./stage-front-office.component.css']
})
export class StageFrontOfficeComponent implements OnInit {

  stages: Stage[] = [];
  searchTerm: string = '';  // Variable to store search input

  constructor(private serv: StageService) { }

  ngOnInit(): void {
    this.serv.getStages().subscribe(
      (data) => {
        this.stages = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching stages:', error);
      }
    );
  }

  // Function to filter stages
  get filteredStages(): Stage[] {
    return this.stages.filter(stage =>
      stage.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
