import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
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

  // Método para agregar un card con ID automático
  async addCard(card: Omit<CardData, 'id'>): Promise<string> {
    const cardsCollection = collection(this.firestore, 'cards');
    const docRef = await addDoc(cardsCollection, card);
    return docRef.id;
  }

  // Método para agregar un card con ID específico
  async addCardWithId(id: string, card: Omit<CardData, 'id'>): Promise<void> {
    if (!id?.trim()) {
      throw new Error('El ID es requerido');
    }
    const cardDoc = doc(this.firestore, `cards/${id}`);
    await setDoc(cardDoc, card);
  }
}
