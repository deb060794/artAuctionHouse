import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArticlesComponent } from './user-articles.component';

describe('UserArticlesComponent', () => {
  let component: UserArticlesComponent;
  let fixture: ComponentFixture<UserArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserArticlesComponent]
    });
    fixture = TestBed.createComponent(UserArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
