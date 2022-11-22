import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, timeoutWith } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private requestTimeout = 60000;

  constructor(private httpRequest: HttpClient) {}

  getRest(restUrl: string, queryParam?: HttpParams): Observable<any> {
    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: queryParam,
    };
    return this.httpRequest.get(restUrl, header).pipe(
      timeoutWith(this.requestTimeout, throwError(new Error('[TIMEOUT_ERR]: '))),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  getRestDownloadFile(restUrl: string): Observable<any> {
    return this.httpRequest.get(restUrl, { responseType: 'blob' as 'json' }).pipe(
      timeoutWith(this.requestTimeout, throwError(new Error('[TIMEOUT_ERR]: '))),
      catchError((e) => {
        return throwError(e);
      })
    );
  }
}
