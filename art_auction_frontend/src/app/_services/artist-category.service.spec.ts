import { TestBed } from '@angular/core/testing';

import { ArtistCategoryService } from './artist-category.service';

describe('ArtistCategoryService', () => {
  let service: ArtistCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
