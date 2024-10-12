import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDetailComponent } from "./trip-detail/trip-detail.component";
import { TripListComponent } from "./trip-list/trip-list.component";
import { Trip } from './trip.model';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, TripDetailComponent, TripListComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {
  selectedTrip!: Trip;

}
