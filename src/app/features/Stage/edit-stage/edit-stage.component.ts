import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stage } from 'src/app/models/Stage';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-edit-stage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-stage.component.html',
  styleUrls: ['./edit-stage.component.css']
})
export class EditStageComponent {

  stageForm: FormGroup;
  
  stageId!: number;
  
  stage: Stage;

  constructor(private fb: FormBuilder,private serv: StageService,private router: Router,private route: ActivatedRoute) { 

    // hnee controle saisie
    this.stageForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.stage = {
      id: 0,
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date()
    }


  }

  ngOnInit() {
    this.stageId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.stageId) {
      this.serv.getStageById(this.stageId).subscribe((stage) => {
        this.stageForm.patchValue(stage);
        this.stage = stage;
      });
    }
  }

  onSubmit() {
    if (this.stageForm.valid) {
      console.log(this.stageForm.value);
      console.log(this.stageId);

      this.serv.updateStage(this.stageId, this.stage).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/stages']);
        }
      );
    }
  }


  deleteStage() {
    this.serv.deleteStage(this.stageId).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/stages']);
      }
    );
  }
}
