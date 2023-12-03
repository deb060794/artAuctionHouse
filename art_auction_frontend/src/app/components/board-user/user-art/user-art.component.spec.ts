import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArtComponent } from './user-art.component';

describe('UserArtComponent', () => {
  let component: UserArtComponent;
  let fixture: ComponentFixture<UserArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserArtComponent]
    });
    fixture = TestBed.createComponent(UserArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
