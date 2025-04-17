import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stage } from 'src/app/models/Stage';
import { StageService } from 'src/app/services/stage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-stage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-stage.component.html',
  styleUrls: ['./edit-stage.component.css'],
  providers: [DatePipe]
})
export class EditStageComponent {

  stageForm: FormGroup;
  stageId!: number;
  stage: Stage;

  constructor(
    private fb: FormBuilder,
    private serv: StageService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { 

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
        this.stage = stage;
        this.stageForm.patchValue({
          title: stage.title,
          description: stage.description,
          startDate: this.datePipe.transform(stage.startDate, 'yyyy-MM-dd'),
          endDate: this.datePipe.transform(stage.endDate, 'yyyy-MM-dd')
        });
      });
    }
  }

  onSubmit() {
    if (this.stageForm.valid) {
      const updatedStage = { ...this.stage, ...this.stageForm.value };
      this.serv.updateStage(this.stageId, updatedStage).subscribe(
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