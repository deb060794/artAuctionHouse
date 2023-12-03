import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArtDialogComponent } from './create-art-dialog.component';

describe('CreateArtDialogComponent', () => {
  let component: CreateArtDialogComponent;
  let fixture: ComponentFixture<CreateArtDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateArtDialogComponent]
    });
    fixture = TestBed.createComponent(CreateArtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
