import { Component } from '@angular/core';
import { Stage } from 'src/app/models/Stage';
import { StageService } from 'src/app/services/stage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stage-front-office',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './stage-front-office.component.html',
  styleUrls: ['./stage-front-office.component.css']
})
export class StageFrontOfficeComponent {

  constructor(private serv: StageService) { }

  stages : Stage[] = [];


  ngOnInit(): void {

    this.serv.getStages().subscribe(
      (data) => {
        this.stages = data;
        console.log(data);
      });
    
  }
}
