import { Component } from '@angular/core';
import { CardService } from '../services/card.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-animal.html',
  styleUrls: ['./add-animal.scss']
})
export class AddAnimal {
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private cardService: CardService) {}

  addCardWithId(id: string, form: NgForm) {
    if (!form.valid || !id?.trim()) {
      this.errorMessage = 'Por favor, complete todos los campos requeridos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { nombreComun, nombreCientifico, clasificacion, habitat, alimentacion, reproduccion, caracteristicas, imagen } = form.value;
    
    this.cardService.addCardWithId(id.trim(), {
      nombreComun,
      nombreCientifico,
      clasificacion,
      habitat,
      alimentacion,
      reproduccion,
      caracteristicas,
      imagen
    })
    .then(() => {
      this.successMessage = `Animal agregado exitosamente con ID: ${id}`;
      form.reset();
    })
    .catch((err: Error) => {
      this.errorMessage = `Error al agregar el animal: ${err.message}`;
      console.error('Error al agregar animal:', err);
    })
    .finally(() => {
      this.isLoading = false;
    });
  }
}
