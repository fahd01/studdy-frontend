import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadService} from "../../../../../services/file-upload.service";
import {HttpResponse} from "@angular/common/http";
import {ArrayUtils, StringUtils} from 'turbocommons-ts';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent {
  id?: number;
  moduleForm!: FormGroup
  //courseToEdit!: Course
  page = {
    title: "Create Module",
    breadcrumb: "Create",
    cardTitle: "Module Creation Form",
    cardDescription: "Fill details for your module"
  }

  selectedFiles?: FileList;
  externalLinks: URL[] = [];
  message: string[] = [];

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.moduleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      externalLink: new FormControl('')
      // TODO add the rest of form elements
    });
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

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
      this.selectedFiles = undefined;
    }
  }


  saveModule(){

  }

  humanReadableFileSize(size: number | undefined) {
    if (!size) return '0 Bytes'
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
    while(size >= 1024) { size /= 1024; ++i;}
    return `${size.toFixed(1)} ${units[i]}`;
  }

  protected readonly StringUtils = StringUtils;
  protected readonly ArrayUtils = ArrayUtils;
}
