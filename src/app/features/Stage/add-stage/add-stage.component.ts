import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StageService } from 'src/app/services/stage.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-stage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
})
export class AddStageComponent {
  stageForm: FormGroup;

  constructor(private fb: FormBuilder, private serv: StageService, private router: Router) {
    this.stageForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    }, { validators: this.dateValidator });
  }
  
  onSubmit(event: Event) {
    event.preventDefault(); // 
    if (this.stageForm.valid) {
      console.log(this.stageForm.value);
      this.serv.addStage(this.stageForm.value).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/stages']);
      });
    }
  }

  dateValidator(formGroup: FormGroup) {
    const start = formGroup.get('startDate')?.value;
    const end = formGroup.get('endDate')?.value;
    return start && end && start > end ? { dateInvalid: true } : null;
  }
  
}
