import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadService} from "../../../../services/file-upload.service";
import {HttpResponse} from "@angular/common/http";
import {StringUtils} from 'turbocommons-ts';
import {Course} from "../../../../models/Course.model";
import {CourseService} from "../../../../services/course-managment/course.service";
import {ActivatedRoute} from "@angular/router";
import {Module} from "../../../../models/Module.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {catchError, forkJoin, of} from "rxjs";

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent {
  moduleForm!: FormGroup
  //courseToEdit!: Course

  courseIdPathParam!: number;
  courses: Course[] = []
  selectedFiles?: FileList;
  externalLinks: URL[] = [];
  message: string[] = [];

  modules: Module[] = []

  @ViewChild('createModuleModalContent') modalContent: any

  constructor(
      private uploadService: FileUploadService,
      private modalService: NgbModal,
      private activatedRoute: ActivatedRoute,
      private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // TODO make local ?
    this.courseIdPathParam = this.activatedRoute.snapshot.params['id'];
    this.loadModules(this.courseIdPathParam!);

    this.moduleForm = new FormGroup({
      courseId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      externalLink: new FormControl('')
    });

    // TODO shift from loading all courses to loading a single course by id
    this.courseService.fetchAllCourses().subscribe({
      next: data => {
        this.courses = data
        if (this.courseIdPathParam) {
          let courseIdFormControl = `${this.courseIdPathParam} - ${data.filter(couse => couse.id == this.courseIdPathParam)[0].title}`
          this.moduleForm.patchValue({courseId: courseIdFormControl});
        }
      },
      error: error => console.error("Error fetching course", error)
    })
  }

  loadModules(courseId: number) {
    return this.courseService.getModules(courseId).subscribe({
      next: data => this.modules = data,
      error: error => console.error(`Error fetching modules for course ${courseId}`)
    })
  }

  addExternalLink(event: Event){
    this.externalLinks.push(new URL(this.moduleForm.value['externalLink']))
    this.moduleForm.get('externalLink')?.setValue('')
  }

  removeExternalLink(index: number){
    this.externalLinks.splice(index, 1)
  }

  selectFiles(event: any): void {
    this.message = [];
    if (!this.selectedFiles) {
      this.selectedFiles = event.target.files;
      return
    }
    const joined = Array.from(this.selectedFiles).concat(Array.from(event.target.files));
    this.selectedFiles = this.fileArrayToFileList(joined);
  }

  removeFile(index: number) {
    const filesArray = Array.from(this.selectedFiles!);
    filesArray.splice(index, 1);
    this.selectedFiles = this.fileArrayToFileList(filesArray)
  }

  fileArrayToFileList(files: File[]): FileList {
    let list = new DataTransfer()
    let backing: File[] = [];
    for(let file of files)
      // Do not add files that are already added (files are equal if they have the same name and size)
      if (backing.filter(f => f.name == file.name && file.size == file.size).length == 0) {
        list.items.add(file)
        backing.push(file)
      }
    return list.files
  }

  /*
  upload(file: File): void {
    if (file) {
      this.uploadService.upload(file).subscribe({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            const msg = file.name + ": Successful!";
            this.message.push(msg);
          }
        },
        error: (err: any) => {
          let msg = file.name + ": Failed!";

          if (err.error && err.error.message) {
            msg += " " + err.error.message;
          }

          this.message.push(msg);
        }
      });
    }
  }
  */

  addModule(modal: any) {
    let module = {
      ... this.moduleForm.value,
      files: this.selectedFiles ? Array.from(this.selectedFiles!) : [],
      externalLinks: this.externalLinks
    } as Module
    this.persistModuleAddition(this.courseIdPathParam!, module)
    // TODO move modal close and clean up inside persistModuleAddition
    modal.close()
    this.clearDefineModuleModal()
  }

  persistModuleAddition(courseId: number, module: Module) {
    // Save module, when successful upload module attachments
    this.courseService.saveModule(courseId, module).subscribe({
      next: data => {
        const uploads = module.files.map(file => this.uploadService.upload(courseId, data.id!, file).pipe(
            catchError(error => { console.error(`Error uploading file: ${file.name}`, error); return of(null);})
        ));
        forkJoin(uploads).subscribe({
          next: results => this.loadModules(courseId),
          error: err => console.error("Unexpected error during uploads", err)
        });
      },
      error: error => console.error("Error occurred while saving module to backend")
    })
  }

  deleteModule(moduleId: number) {
    if(confirm(`Are you sure you want to delete this module`)) {
      this.courseService.deleteModule(this.courseIdPathParam, moduleId).subscribe({
        next: data => this.loadModules(this.courseIdPathParam),
        error: error => console.error(`Error deleting module ${moduleId}`, error)
      })
    }
  }

  /* TODO For bulk module handling
  save(){
    const selectedCourseValue = this.moduleForm.value.courseId;
    const courseIdOnly = selectedCourseValue.split(" - ")[0];

    console.log('this.modules')
    console.log(this.modules)
  }
  */

  humanReadableFileSize(size: number | undefined) {
    if (!size) return '0 Bytes'
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
    while(size >= 1024) { size /= 1024; ++i;}
    return `${size.toFixed(1)} ${units[i]}`;
  }

  openDefineModuleModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  clearDefineModuleModal(){
    let courseId = this.moduleForm.get('courseId')?.value;
    this.moduleForm.reset()
    this.moduleForm.patchValue({ courseId: courseId });
    this.externalLinks = []
    this.selectedFiles = new DataTransfer().files;
  }

  protected readonly StringUtils = StringUtils;
}
