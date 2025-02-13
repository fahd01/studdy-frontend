import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentDashbordComponent } from './main-content-dashbord.component';

describe('MainContentDashbordComponent', () => {
  let component: MainContentDashbordComponent;
  let fixture: ComponentFixture<MainContentDashbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainContentDashbordComponent]
    });
    fixture = TestBed.createComponent(MainContentDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
