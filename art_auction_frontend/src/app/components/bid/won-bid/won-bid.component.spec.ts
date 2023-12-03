import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonBidComponent } from './won-bid.component';

describe('WonBidComponent', () => {
  let component: WonBidComponent;
  let fixture: ComponentFixture<WonBidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WonBidComponent]
    });
    fixture = TestBed.createComponent(WonBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
