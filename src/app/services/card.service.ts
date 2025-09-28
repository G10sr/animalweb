import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface CardData {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  clasificacion: string;
  habitat: string;
  alimentacion: string;
  reproduccion: string;
  caracteristicas: string;
  imagen?: string;
}

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor(private firestore: Firestore) {}

  getCards(): Observable<CardData[]> {
    const cardsCollection = collection(this.firestore, 'cards');
    return collectionData(cardsCollection, { idField: 'id' }) as Observable<CardData[]>;
  }
}
import {  addDoc, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CardProviderInyecter {
  constructor(private firestore: Firestore) {}

  getCards(): Observable<CardData[]> {
    const cardsCollection = collection(this.firestore, 'cards');
    return collectionData(cardsCollection, { idField: 'id' }) as Observable<CardData[]>;
  }

  // Método para agregar un card con ID automático
  addCard(card: Omit<CardData, 'id'>) {
    const cardsCollection = collection(this.firestore, 'cards');
    return addDoc(cardsCollection, card);
  }

  // Método para agregar un card con ID específico
  addCardWithId(id: string, card: Omit<CardData, 'id'>) {
    const cardDoc = doc(this.firestore, `cards/${id}`);
    return setDoc(cardDoc, card);
  }
}
