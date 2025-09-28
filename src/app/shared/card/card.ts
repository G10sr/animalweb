import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData } from '../../services/card.service'; // importá la interfaz desde tu servicio

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.scss']
})
export class Card {
  @Input() card!: CardData;

  getHabitatClass(habitat: string): string {
    // Normalizar el texto: convertir a minúsculas y remover guiones
    const habitatNormalized = habitat.toLowerCase().replace(/-/g, '');

    // Primero verificar si es aéreo-terrestre
    if (habitatNormalized.includes('aero') || 
        habitatNormalized.includes('aéreo') || 
        habitatNormalized.includes('aeroterrestre')) {
      return 'aereo-terrestre';
    }
    
    // Luego verificar si es terrestre
    if (habitatNormalized.includes('terrestre')) {
      return 'terrestre';
    }
    
    // Finalmente verificar si es acuático
    if (habitatNormalized.includes('acuatico') || 
        habitatNormalized.includes('acuático')) {
      return 'acuatico';
    }
    
    return '';
  }
}
