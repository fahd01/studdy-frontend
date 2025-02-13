import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDashbordComponent } from './navbar-dashbord.component';

describe('NavbarDashbordComponent', () => {
  let component: NavbarDashbordComponent;
  let fixture: ComponentFixture<NavbarDashbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarDashbordComponent]
    });
    fixture = TestBed.createComponent(NavbarDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
