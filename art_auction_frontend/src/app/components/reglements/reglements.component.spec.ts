import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsComponent } from './reglements.component';

describe('ReglementsComponent', () => {
  let component: ReglementsComponent;
  let fixture: ComponentFixture<ReglementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglementsComponent]
    });
    fixture = TestBed.createComponent(ReglementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
