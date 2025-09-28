import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { CardService, CardData } from './services/card.service';
import { Card } from "./shared/card/card";
import { NgForOf } from '@angular/common';
import { AddAnimal } from "./add-animal/add-animal";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Card, NgForOf, AddAnimal],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  allCards: CardData[] = [];
  filteredCards: CardData[] = [];
  cards$: Observable<CardData[]>;

  constructor(private cardService: CardService) {
    this.cards$ = this.cardService.getCards();
    this.cards$.subscribe((cards: CardData[]) => {
      this.allCards = cards;
      this.filteredCards = cards;
    });
  }

  private safeIncludes(text: string | undefined | null, searchText: string): boolean {
    return text ? text.toLowerCase().includes(searchText) : false;
  }

  onSearch(searchText: string) {
    console.log('Search received in App:', searchText); // Debug
    console.log('Current cards:', this.allCards); // Debug

    if (!searchText || !searchText.trim()) {
      console.log('Empty search, showing all cards'); // Debug
      this.filteredCards = [...this.allCards];
      return;
    }

    searchText = searchText.toLowerCase().trim();
    console.log('Searching for:', searchText); // Debug

    this.filteredCards = this.allCards.filter(card => {
      if (!card) {
        console.log('Found null card'); // Debug
        return false;
      }

      // Debug log para cada card
      console.log('Checking card:', {
        id: card.id,
        nombre: card.nombreComun,
        cientifico: card.nombreCientifico,
        clasificacion: card.clasificacion,
        habitat: card.habitat,
        alimentacion: card.alimentacion,
        reproduccion: card.reproduccion,
        caracteristicas: card.caracteristicas
      });

      const matches = [
        card.id?.toString().toLowerCase().includes(searchText),
        card.nombreComun?.toLowerCase().includes(searchText),
        card.nombreCientifico?.toLowerCase().includes(searchText),
        card.clasificacion?.toLowerCase().includes(searchText),
        card.habitat?.toLowerCase().includes(searchText),
        card.alimentacion?.toLowerCase().includes(searchText),
        card.reproduccion?.toLowerCase().includes(searchText),
        card.caracteristicas?.toLowerCase().includes(searchText)
      ].some(match => match === true);

      console.log('Card matches:', matches); // Debug
      return matches;
    });

    console.log('Filtered cards:', this.filteredCards); // Debug
  }

}
