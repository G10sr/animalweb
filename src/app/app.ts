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

  onSearch(searchText: string) {
    if (!searchText.trim()) {
      this.filteredCards = this.allCards;
      return;
    }

    searchText = searchText.toLowerCase();
    this.filteredCards = this.allCards.filter(card => 
      card.nombreComun.toLowerCase().includes(searchText) ||
      card.nombreCientifico.toLowerCase().includes(searchText) ||
      card.clasificacion.toLowerCase().includes(searchText) ||
      card.habitat.toLowerCase().includes(searchText) ||
      card.caracteristicas.toLowerCase().includes(searchText)
    );
  }

}
