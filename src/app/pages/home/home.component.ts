import { Component, OnInit } from '@angular/core';
import { PlantasService } from 'src/app/services/plantas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  plantas: any[] = []; // Almacenar las plantas obtenidas del backend

  constructor(private plantasService: PlantasService) {}

  ngOnInit(): void {
    this.obtenerPlantas();
  }

  obtenerPlantas(): void {
    this.plantasService.getPlantas().subscribe({
      next: (data) => {
        this.plantas = data;
      },
      error: (err) => {
        console.error('Error al obtener plantas:', err);
      },
    });
  }

  agregarPlanta(): void {
    const nuevaPlanta = {
      pais: 'Chile',
      nombre: 'Nueva Planta',
      lecturas: 100,
      alertasMedias: 5,
      alertasRojas: 1,
    };

    this.plantasService.createPlanta(nuevaPlanta).subscribe({
      next: (data) => {
        console.log('Planta creada:', data);
        this.obtenerPlantas(); // Actualizar la lista
      },
      error: (err) => {
        console.error('Error al crear planta:', err);
      },
    });
  }

  editarPlanta(planta: any): void {
    const plantaEditada = { ...planta, nombre: 'Planta Editada' };

    this.plantasService.updatePlanta(planta.id, plantaEditada).subscribe({
      next: (data) => {
        console.log('Planta actualizada:', data);
        this.obtenerPlantas(); // Actualizar la lista
      },
      error: (err) => {
        console.error('Error al actualizar planta:', err);
      },
    });
  }

  eliminarPlanta(id: number): void {
    this.plantasService.deletePlanta(id).subscribe({
      next: () => {
        console.log('Planta eliminada');
        this.obtenerPlantas(); // Actualizar la lista
      },
      error: (err) => {
        console.error('Error al eliminar planta:', err);
      },
    });
  }
}
