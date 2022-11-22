import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
              HttpClientModule,
              RouterTestingModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientTestingModule
          ],
       providers:[HttpClient]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
