import { Component, HostListener } from '@angular/core';
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

  screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

  // Control del estado de detalles en móviles
  detailsOpenUser = false;

  constructor(private cardService: CardService) {
    this.cards$ = this.cardService.getCards();
    this.cards$.subscribe((cards: CardData[]) => {
      this.allCards = cards;
      this.filteredCards = cards;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: Event) {
    this.screenWidth = window.innerWidth;
  }

  // Toggle manual: se llama desde (click) en summary
  toggleDetails(event: MouseEvent) {
    event.preventDefault(); // evita comportamiento nativo de <details>
    
    if (this.screenWidth <= 720) {
      this.detailsOpenUser = !this.detailsOpenUser; // solo móviles
    }
    // pantallas grandes >500px: no hace nada, siempre abierto
  }

  get detailsOpen(): boolean {
    // Pantallas grandes siempre abierto
    return this.screenWidth > 720 || this.detailsOpenUser;
  }

  private safeIncludes(text: string | undefined | null, searchText: string): boolean {
    return text ? text.toLowerCase().includes(searchText) : false;
  }

  onSearch(searchText: string) {
    if (!searchText || !searchText.trim()) {
      this.filteredCards = [...this.allCards];
      return;
    }

    searchText = searchText.toLowerCase().trim();
    this.filteredCards = this.allCards.filter(card => {
      if (!card) return false;

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

      return matches;
    });
  }
}
