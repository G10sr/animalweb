import { Component } from '@angular/core';
import { CardProviderInyecter } from '../services/card.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-animal.html',
  styleUrls: ['./add-animal.scss']
})
export class AddAnimal {
  constructor(private cardService: CardProviderInyecter) {}

  addAnimal(form: NgForm) {
    if (form.valid) {
      const { nombreComun, nombreCientifico, clasificacion, habitat, alimentacion, reproduccion, caracteristicas, imagen } = form.value;
      this.cardService.addCard({
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
        console.log('Animal agregado');
        form.reset();
      })
      .catch(err => console.error(err));
    }
  }
}
