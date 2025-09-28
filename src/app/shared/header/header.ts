import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  searchText: string = '';
  @Output() search = new EventEmitter<string>();

  onSearchChange(event: any): void {
    // Emitimos el evento de búsqueda solo si hay texto
    if (this.searchText.trim()) {
      this.search.emit(this.searchText);
    } else {
      this.clearSearch();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchText.trim()) {
      this.search.emit(this.searchText);
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.search.emit('');
  }
}
