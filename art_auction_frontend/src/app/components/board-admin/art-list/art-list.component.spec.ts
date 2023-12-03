import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtListComponent } from './art-list.component';

describe('ArtListComponent', () => {
  let component: ArtListComponent;
  let fixture: ComponentFixture<ArtListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtListComponent]
    });
    fixture = TestBed.createComponent(ArtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
