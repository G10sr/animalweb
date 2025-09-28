import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { CardService, CardData } from './services/card.service';
import { Card } from "./shared/card/card";
import { NgForOf, AsyncPipe } from '@angular/common';
import { AddAnimal } from "./add-animal/add-animal";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Card, NgForOf, AsyncPipe, AddAnimal],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  cards$;

  constructor(private cardService: CardService) {
    this.cards$ = this.cardService.getCards();
  }
  

}
