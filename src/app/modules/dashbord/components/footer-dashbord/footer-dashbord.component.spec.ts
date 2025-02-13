import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDashbordComponent } from './footer-dashbord.component';

describe('FooterDashbordComponent', () => {
  let component: FooterDashbordComponent;
  let fixture: ComponentFixture<FooterDashbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterDashbordComponent]
    });
    fixture = TestBed.createComponent(FooterDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
