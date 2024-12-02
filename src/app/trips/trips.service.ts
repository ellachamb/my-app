import { EventEmitter, Injectable } from '@angular/core';
import { Trip } from './trip.model';
import { MOCKTRIPS } from './MOCKTRIPS';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  tripSelected = new EventEmitter<Trip>();

  // Local storage for trips
  private trips: Trip[] = MOCKTRIPS;

  constructor() {}

  // Get all trips
  getTrips(): Trip[] {
    return this.trips.slice(); // Return a copy of the array
  }

  // Get a single trip by ID
  getTrip(id: string): Trip | undefined {
    return this.trips.find(trip => trip.id === id);
  }

  // Add a new trip
  addTrip(trip: Trip): void {
    this.trips.push(trip);
  }

  // Update an existing trip
  updateTrip(id: string, updatedTrip: Trip): void {
    const index = this.trips.findIndex(trip => trip.id === id);
    if (index !== -1) {
      this.trips[index] = updatedTrip;
    }
  }

  // Delete a trip
  deleteTrip(id: string): void {
    const index = this.trips.findIndex(trip => trip.id === id);
    if (index !== -1) {
      this.trips.splice(index, 1); 
      console.log('Trip deleted:', this.trips);
    }
  }
  
  
}
