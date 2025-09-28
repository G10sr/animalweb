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
    console.log('Search text changed:', this.searchText); // Debug
    this.search.emit(this.searchText);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Form submitted with:', this.searchText); // Debug
    this.search.emit(this.searchText);
  }

  clearSearch(): void {
    this.searchText = '';
    this.search.emit('');
  }
}
