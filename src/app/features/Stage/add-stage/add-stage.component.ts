import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StageService } from 'src/app/services/stage.service';
@Component({
  selector: 'app-add-stage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
})
export class AddStageComponent {
  stageForm: FormGroup;

  constructor(private fb: FormBuilder,private serv: StageService,private router: Router) { 

    // hnee controle saisie
    this.stageForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.stageForm.valid) {
      console.log(this.stageForm.value);
       this.serv.addStage(this.stageForm.value).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/stages']);

        }
      );


    }
  }

  
}
