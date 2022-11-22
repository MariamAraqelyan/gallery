import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PhotoDetail } from '../model/photo-detail.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryService {

  constructor(private http: HttpClient) {}

    getPhotos(page: number, limit: number): Observable<PhotoDetail[]> {
      return this.http.get<PhotoDetail[]>(`${baseUrl}/v2/list?page=${page}&limit=${limit}`)
        .pipe(
          catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error.message}`;
            } else {
              errorMsg = `Error: ${error.message}`;
            }
            return throwError(errorMsg);
          })
        );
    }
}
