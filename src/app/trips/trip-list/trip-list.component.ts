import { Component, Output, EventEmitter } from '@angular/core';
import { TripItemComponent } from "./trip-item/trip-item.component";
import { Trip } from '../trip.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [TripItemComponent, CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent {
  @Output() selectedTripEvent = new EventEmitter<Trip>();
  trips: Trip[] = [
    new Trip("1", "New York City", new Date("2024-10-19"), new Date("2024-10-22"), "nyc.jpg"),
    new Trip("2", "Paris", new Date("2025-06-10"), new Date("2025-06-24"), "paris.jpg"),
  ];

  onTripSelected(trip: Trip) { 
    this.selectedTripEvent.emit(trip); 
  }
}
