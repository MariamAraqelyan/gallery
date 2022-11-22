import { TestBed } from '@angular/core/testing';

import { PhotoGalleryService } from './photo-gallery.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

describe('PhotoGalleryService', () => {
  let service: PhotoGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            RouterTestingModule,
            FormsModule,
            ReactiveFormsModule,
        ],
        providers:[HttpClient]
    });
    service = TestBed.inject(PhotoGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
