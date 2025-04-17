import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTableViewComponent } from './course-table-view.component';

describe('CourseTableViewComponent', () => {
  let component: CourseTableViewComponent;
  let fixture: ComponentFixture<CourseTableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTableViewComponent]
    });
    fixture = TestBed.createComponent(CourseTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
