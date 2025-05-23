import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationListComponent } from './formation-list.component';

describe('ListComponent', () => {
  let component: FormationListComponent;
  let fixture: ComponentFixture<FormationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
