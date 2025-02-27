import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl} from '@angular/forms';
import {first, Observable, startWith, take} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../../../models/Quiz.model";
import {Question} from "../../../../models/Questions.model";

@Component({
  selector: 'app-quiz-management',
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.css']
})
export class QuizManagementComponent implements OnInit {

  // @ts-ignore
  quizForm: FormGroup;
  categories: Map<string, string> = new Map();
  filteredCategories: Observable<string[]> = new Observable<string[]>();
  lastValidCategory: string = '';
  isOpened: boolean = false;
  isSubmitted:boolean =false;

  quizId: string | undefined;
  editQuizId: string | undefined;

  //categories: Observable<string[]>;
  constructor(private route: ActivatedRoute, public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.editQuizId = params['id'];


        this.initForm();

        this.filteredCategories = this.quizForm.controls['categoryDisplay'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
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
    this.quizForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      categoryId: [this.lastValidCategory, Validators.required],
      categoryDisplay: [this.categories.get(this.lastValidCategory)],
      questions: this.fb.array([
        this.initQuestion()
      ])
    });
  }

  fillFormWithQuizData(quiz: Quiz): void {
    this.quizForm.patchValue({
      name: quiz.name,
      description: quiz.description,
    });

    this.quizForm.setControl('questions', this.fb.array(quiz.questions.map((q: Question) => this.initQuestionWithData(q))));
  }

  initQuestionWithData(question: Question): FormGroup {
    return this.fb.group({
      question: [question.question, Validators.required],
      options: this.fb.array(
          question.options.map(option => new FormControl(option)),
          Validators.required
      ),
      answer: [question.answer, Validators.required]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return Array.from(this.categories.values()).filter(category => category.toLowerCase().includes(filterValue));
  }

  updateLastValid(event: any, category: string) {
    if (event.isUserInput) {
      // @ts-ignore
      const categoryId = Array.from(this.categories.entries()).find(([key, value]) => value === category)[0];
      this.quizForm.controls['categoryId'].setValue(categoryId);
      this.lastValidCategory = categoryId;
    }
  }

  isCategoryExists(categoryId: string){
    return this.categories.has(categoryId);
  }

  checkCategory() {
    if (!this.isOpened && !this.isCategoryExists(this.quizForm.controls['categoryId'].value)) {
      this.quizForm.controls['categoryId'].setValue(this.lastValidCategory);
      this.quizForm.controls['categoryDisplay'].setValue(this.categories.get(this.lastValidCategory));
    }
  }


  getOptionsArray(control: AbstractControl<any>): FormArray{
    return control.get('options') as FormArray;
  }



  initQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.initOption(),
        this.initOption(),
        this.initOption(),
        this.initOption()
      ], Validators.required),
      answer: [0, Validators.required]
    });
  }

  onOpen() {
    this.isOpened = true;
  }


  onClose() {
    this.isOpened = false;
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

  mapFormToQuizModal(): Quiz {
    const quizModal: Quiz = {
      name: this.quizForm.get('name')?.value,
      description: this.quizForm.get('description')?.value,
      questions: this.mapQuestionsArrayToQuestionModalArray(this.quizForm.get('questions') as FormArray),
    } as Quiz;

    return quizModal;
  }

  submitQuiz(): void {

    if (this.quizForm.valid) {
      const quizData: Quiz =  this.mapFormToQuizModal();

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