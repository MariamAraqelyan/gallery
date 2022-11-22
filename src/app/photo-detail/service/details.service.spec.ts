import { TestBed } from '@angular/core/testing';

import { DetailsService } from './details.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetailsService', () => {
  let service: DetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
              HttpClientModule,
              RouterTestingModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientTestingModule
          ],
       providers:[HttpClient, DetailsService]
    });
    service = TestBed.inject(DetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
