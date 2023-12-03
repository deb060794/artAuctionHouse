import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLotDialogComponent } from './create-lot-dialog.component';

describe('CreateLotDialogComponent', () => {
  let component: CreateLotDialogComponent;
  let fixture: ComponentFixture<CreateLotDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLotDialogComponent]
    });
    fixture = TestBed.createComponent(CreateLotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
