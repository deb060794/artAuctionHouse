import { TestBed } from '@angular/core/testing';

import { ArtCategoryService } from './art-category-service';

describe('ArtCategoryServiceService', () => {
  let service: ArtCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
