import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBidsComponent } from './recent-bids.component';

describe('RecentBidsComponent', () => {
  let component: RecentBidsComponent;
  let fixture: ComponentFixture<RecentBidsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentBidsComponent]
    });
    fixture = TestBed.createComponent(RecentBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
