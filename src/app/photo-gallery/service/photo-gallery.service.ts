import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/helper/service/api.service';
import { PhotoDetail } from '../model/photo-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryService {

  private apiUrl = 'https://picsum.photos/v2/list';

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getImages(pageNumber: any): Observable<PhotoDetail[]> {
    let params = new HttpParams().append('page', pageNumber);
    return this.apiService.getRest(this.apiUrl, params).pipe(
      map((jsonResponse: any) => {
        console.log(typeof jsonResponse, 'jhk')
        const PhotoList = new Array<PhotoDetail>();
        jsonResponse.forEach((index: any) => {
          console.log(index, 'index')
          return  PhotoList.push(
               new PhotoDetail(
                 index.id,
                 index.author,
                 index.width,
                 index.height,
                 index.download_url,
               )
             )
          }
        );
        return PhotoList;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }


    getPhotos(page: number, limit: number): Observable<PhotoDetail[]> {
      return this.http.get<PhotoDetail[]>(`${this.apiUrl}?page=${page}&limit=${limit}`)
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
