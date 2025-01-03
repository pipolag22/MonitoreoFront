import { Component, OnInit } from '@angular/core';
import { PlantasService } from 'src/app/services/plantas.service';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  plantas: any[] = [];
  indicadores: any[] = [];
  paises: string[] = [];
  nuevaPlanta: any = {
    pais: '',
    nombre: '',
    lecturas: 0,
    alertasMedias: 0,
    alertasRojas: 0,
  };

  constructor(
    private plantasService: PlantasService,
    private paisesSerPvice: PaisesService
  ) {}

  ngOnInit(): void {
    this.obtenerPlantas();
    this.obtenerPaises();
    this.obtenerIndicadores();
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

  obtenerPaises(): void {
    this.paisesSerPvice.getPaises().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (err) => {
        console.error('Error al obtener países:', err);
      },
    });
  }

  agregarPlanta(): void {
    if (!this.nuevaPlanta.pais || !this.nuevaPlanta.nombre) {
      console.warn(
        'Por favor, complete todos los campos antes de agregar una planta.'
      );
      return;
    }

    this.plantasService.createPlanta(this.nuevaPlanta).subscribe({
      next: (data) => {
        console.log('Planta creada:', data);
        this.obtenerPlantas();
        this.resetNuevaPlanta();
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
        this.obtenerPlantas();
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
        this.obtenerPlantas();
      },
      error: (err) => {
        console.error('Error al eliminar planta:', err);
      },
    });
  }

  obtenerIndicadores(): void {
    this.indicadores = [
      { titulo: 'Temperatura', valor: 'Sin datos' },
      { titulo: 'Presión', valor: 'Sin datos' },
      { titulo: 'Viento', valor: 'Sin datos' },
    ];
  }

  resetNuevaPlanta(): void {
    this.nuevaPlanta = {
      pais: '',
      nombre: '',
      lecturas: 0,
      alertasMedias: 0,
      alertasRojas: 0,
    };
  }
}
