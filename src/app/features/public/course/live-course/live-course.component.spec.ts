import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCourseComponent } from './live-course.component';

describe('LiveCourseComponent', () => {
  let component: LiveCourseComponent;
  let fixture: ComponentFixture<LiveCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveCourseComponent]
    });
    fixture = TestBed.createComponent(LiveCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
