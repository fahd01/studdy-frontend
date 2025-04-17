import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageFrontOfficeComponent } from './stage-front-office.component';

describe('StageFrontOfficeComponent', () => {
  let component: StageFrontOfficeComponent;
  let fixture: ComponentFixture<StageFrontOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageFrontOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StageFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
