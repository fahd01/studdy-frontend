import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../../../models/Quiz.model";
import {Question} from "../../../../models/Question.model";

// TODO add input validation (look at course creation component)

@Component({
  selector: 'app-quiz-management',
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.css']
})
export class QuizManagementComponent implements OnInit {
  quizForm!: FormGroup;
  quizId: string | undefined;

  constructor(private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = params['id'];


        this.initForm();
        /*
        if (this.editQuizId) {
          this.quizService.getQuizData(this.editQuizId).subscribe((quiz) => {
            if(quiz) {
                this.fillFormWithQuizData(quiz);
            }
          });
        }
         */
      });
  }

  initForm(): void {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      questions: this.formBuilder.array([
        this.initQuestion()
      ])
    });
  }

  fillFormWithQuizData(quiz: Quiz): void {
    this.quizForm.patchValue({
      name: quiz.name,
      description: quiz.description,
    });

    this.quizForm.setControl('questions', this.formBuilder.array(quiz.questions.map((q: Question) => this.initQuestionWithData(q))));
  }

  initQuestionWithData(question: Question): FormGroup {
    return this.formBuilder.group({
      question: [question.question, Validators.required],
      options: this.formBuilder.array(
          question.options.map(option => new FormControl(option)),
          Validators.required
      ),
      answer: [question.answer, Validators.required]
    });
  }

  getOptionsArray(control: AbstractControl<any>): FormArray {
    return control.get('options') as FormArray;
  }

  initQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ['', Validators.required],
      options: this.formBuilder.array([
        this.initOption(),
        this.initOption(),
        this.initOption(),
        this.initOption()
      ], Validators.required),
      answer: [0, Validators.required]
    });
  }

  initOption(): FormControl {
    return new FormControl('')
  }

  addQuestion(): void {
    const questionArray = this.quizForm.get('questions') as FormArray;
    if (questionArray.length < 20) {
      questionArray.push(this.initQuestion());
    }
  }

  removeQuestion(index: number): void {
    const questionArray = this.quizForm.get('questions') as FormArray;
    questionArray.removeAt(index);
  }

  addOption(questionIndex: number): void {
    const optionArray = ((this.quizForm.get('questions') as FormArray).at(questionIndex).get('options') as FormArray);
    if (optionArray.length < 8) {
      optionArray.push(this.initOption());
    }
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const optionArray = ((this.quizForm.get('questions') as FormArray).at(questionIndex).get('options') as FormArray);
    optionArray.removeAt(optionIndex);
  }


  mapQuestionsArrayToQuestionModalArray(questionsArray: FormArray): Question[] {
    const questionModalArray: Question[] = [];

    questionsArray.controls.forEach((questionControl) => {
      const questionModal: Question = {
        question: questionControl.get('question')?.value,
        options: questionControl.get('options')?.value,
        answer: questionControl.get('answer')?.value
      };

      questionModalArray.push(questionModal);
    });

    return questionModalArray;
  }

  mapFormToQuiz(): Quiz {
    return {
      name: this.quizForm.get('name')?.value,
      description: this.quizForm.get('description')?.value,
      questions: this.mapQuestionsArrayToQuestionModalArray(this.quizForm.get('questions') as FormArray),
    } as Quiz;
  }

  submitQuiz(): void {

    if (this.quizForm.valid) {
      const quizData: Quiz =  this.mapFormToQuiz();
      console.log(quizData)

      /*
      if(!this.editQuizId) {
        this.quizService.createQuiz(quizData).then(res => {
              console.log(res)
              this.quizId = res;
            }
        )
      }
      else {
        this.quizService.updateQuiz(this.editQuizId, quizData).then(res => {
              console.log(res)
              this.quizId = this.editQuizId;
            }
        )
      }
       */
    }
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

}