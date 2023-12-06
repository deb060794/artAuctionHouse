import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentArtComponent } from './recent-art.component';

describe('RecentArtComponent', () => {
  let component: RecentArtComponent;
  let fixture: ComponentFixture<RecentArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentArtComponent]
    });
    fixture = TestBed.createComponent(RecentArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
