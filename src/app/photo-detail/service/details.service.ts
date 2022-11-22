import { Injectable } from '@angular/core';
import { PhotoDetail } from 'src/app/photo-gallery/model/photo-detail.model';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/helper/service/api.service';

import { environment } from '../../../environments/environment';
const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private apiService: ApiService) {}

  getImageInfo(id: number): Observable<PhotoDetail> {
    let restUrl = baseUrl + '/id/' + id + '/info';
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
