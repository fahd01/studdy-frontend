import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../../../models/Category.model";
import {CourseService} from "../../../../services/course-managment/course.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories!: Category[];
  categoryForm: FormGroup;
  categoryToEdit?: Category | null = null
  modalInfo = {
    title: "Create Category",
    button: "Create"
  }

  @ViewChild('content') modalContent: any

  constructor(
      private courseService: CourseService,
      private modalService: NgbModal,
      private fb: FormBuilder,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  public loadCategories() {
    this.courseService.fetchAllCategories().subscribe({
      next: data => this.categories = data,
      error: error => console.error('Error fetching courses table-view:', error)
    });
  }

  public deleteCategory(category: Category) {
    if(confirm(`Are you sure you want to delete category: '${category.name}'`)) {
      this.courseService.deleteCategory(category.id!).subscribe({
        next: () => this.loadCategories(),
        error: error => console.error("Error deleting category")
      })
    }
  }

  public triggerEdit(category: Category) {
    this.categoryToEdit = category;
    this.modalInfo.title = "Edit Category"
    this.modalInfo.button = "Edit"
    this.categoryForm.patchValue(this.categoryToEdit)
    this.openCategoryModal(this.modalContent)
  }

  public openCategoryModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Create Category
  createCategory(modal: any): void {
    if (this.categoryForm.invalid) return;

    const newCategory: Category = {
      id: this.categoryToEdit ? this.categoryToEdit.id : null,
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };

    this.courseService.createCategory(newCategory).subscribe({
        next: data => { this.loadCategories(); this.clearEdit(); modal.close()},
        error: error => console.error('Error creating category:', error)
    });
  }

  public clearEdit(){
    this.categoryForm.reset();
    this.categoryToEdit = null;
  }
}
