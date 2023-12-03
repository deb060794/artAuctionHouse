import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArtDialogComponent } from './delete-art-dialog.component';

describe('DeleteArtDialogComponent', () => {
  let component: DeleteArtDialogComponent;
  let fixture: ComponentFixture<DeleteArtDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteArtDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteArtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
