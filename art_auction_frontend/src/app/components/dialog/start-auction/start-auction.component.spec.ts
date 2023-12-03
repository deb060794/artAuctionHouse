import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAuctionComponent } from './start-auction.component';

describe('StartAuctionComponent', () => {
  let component: StartAuctionComponent;
  let fixture: ComponentFixture<StartAuctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartAuctionComponent]
    });
    fixture = TestBed.createComponent(StartAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
