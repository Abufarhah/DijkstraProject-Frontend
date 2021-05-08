import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Country } from './country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DijkstraService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiServerUrl}/countries`)
  }

  public getPath(source: string, destination: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiServerUrl}/countries/path?source=${source}&destination=${destination}`)
  }
}
