import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConditionsComponent } from './general-conditions.component';

describe('GeneralConditionsComponent', () => {
  let component: GeneralConditionsComponent;
  let fixture: ComponentFixture<GeneralConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralConditionsComponent]
    });
    fixture = TestBed.createComponent(GeneralConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
