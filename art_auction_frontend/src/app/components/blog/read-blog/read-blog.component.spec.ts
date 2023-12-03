import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBlogComponent } from './read-blog.component';

describe('ReadBlogComponent', () => {
  let component: ReadBlogComponent;
  let fixture: ComponentFixture<ReadBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadBlogComponent]
    });
    fixture = TestBed.createComponent(ReadBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
