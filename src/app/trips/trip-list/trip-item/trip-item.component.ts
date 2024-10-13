import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../../trip.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.css'
})
export class TripItemComponent {
  @Input() trip!: Trip;
  @Output() tripSelected = new EventEmitter<void>();

  onSelected() {
    this.tripSelected.emit();
  }
}
