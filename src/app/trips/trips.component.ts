import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { TripDetailComponent } from "./trip-detail/trip-detail.component";
import { TripListComponent } from "./trip-list/trip-list.component";
import { Trip } from './trip.model';
import { TripsService } from './trips.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TripDetailComponent, TripListComponent], // Add HttpClientModule to imports
  providers: [TripsService],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent {
  selectedTrip!: Trip;
}