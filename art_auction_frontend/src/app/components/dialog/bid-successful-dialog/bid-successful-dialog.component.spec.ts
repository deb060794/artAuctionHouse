import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSuccessfulDialogComponent } from './bid-successful-dialog.component';

describe('BidSuccessfulDialogComponent', () => {
  let component: BidSuccessfulDialogComponent;
  let fixture: ComponentFixture<BidSuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidSuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(BidSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
