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
  @Input() card!: CardData; // recibimos todo el objeto
}
