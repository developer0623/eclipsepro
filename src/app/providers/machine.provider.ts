import { Injectable } from '@angular/core';
import { Observable, of, throwError, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MachineProvider {
  private API_PATH = 'http://test-eclipse.amscontrols.com:8080';
  private baseUrl = this.API_PATH + '/api/';
  private jobsUrl = this.API_PATH + '/_api/';
  constructor(private http: HttpClient) {}

  getMachinesItems(link): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${link}?skip=0&take=1000`).pipe(
      tap((machines) => {
        console.log('machines', machines);
      })
    );
  }
}
