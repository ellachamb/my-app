import { Component, Output, EventEmitter } from '@angular/core';
import { TripItemComponent } from "../trip-item/trip-item.component";
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
    new Trip("1", "New York City", "10/19/24 - 10/22/24", "nyc.jpg"),
    new Trip("2", "Paris", "6/10/25 - 6/24/25", "paris.jpg"),
  ];

  onTripSelected(trip: Trip) { 
    this.selectedTripEvent.emit(trip); 
  }
}
