import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantasService {
  private readonly API_URL = 'http://localhost:8080/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las plantas
  getPlantas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/plantas`);
  }

  // Crear una nueva planta
  createPlanta(planta: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/plantas`, planta);
  }

  // Editar una planta
  updatePlanta(id: number, planta: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/plantas/${id}`, planta);
  }

  // Eliminar una planta
  deletePlanta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/plantas/${id}`);
  }
}
