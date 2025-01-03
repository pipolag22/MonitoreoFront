import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../constants/api';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private API_URL = `${API}paises`;

  constructor(private http: HttpClient) {}

  getPaises(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL);
  }
}
