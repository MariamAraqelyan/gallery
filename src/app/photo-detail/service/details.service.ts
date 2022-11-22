import { Injectable } from '@angular/core';
import { PhotoDetail } from 'src/app/photo-gallery/model/photo-detail.model';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/helper/service/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private apiUrl = 'https://picsum.photos';

  constructor(private apiService: ApiService) {}

  getImageInfo(id: number): Observable<PhotoDetail> {
    let restUrl = this.apiUrl + '/id/' + id + '/info';
    return this.apiService.getRest(restUrl).pipe(
      map((jsonResponse) => {
        let imgDetails: PhotoDetail;
        imgDetails = {
          id: jsonResponse.id,
          author: jsonResponse.author,
          width: jsonResponse.width,
          height: jsonResponse.height,
          download_url: jsonResponse.download_url,
        };
        return imgDetails;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
