import { Injectable, EventEmitter } from '@angular/core';
import { Trip } from './trip.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  tripListChangedEvent = new EventEmitter<Trip[]>();
  tripChangedEvent = new EventEmitter<Trip>();
  tripSelected = new EventEmitter<Trip>();
  trips: Trip[] = [];
  maxTripId: number = 0;

  constructor(private http: HttpClient) {
    this.getTrips();
  }

  storeTrips(): Observable<void> {
    const url = 'https://itinerary-4e733-default-rtdb.firebaseio.com/trips.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const tripsString = JSON.stringify(this.trips);

    return this.http.put<void>(url, tripsString, { headers });
  }

  getTrips(): void {
    const url = 'https://itinerary-4e733-default-rtdb.firebaseio.com/trips.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http.get<Trip[]>(url, { headers }).subscribe(
      (trips: Trip[] | null) => {
        console.log('Fetched trips:', trips); 
        // Filter out invalid trips
        this.trips = (trips || []).filter((trip): trip is Trip => trip && typeof trip.id === 'string');
        this.maxTripId = this.getMaxId();
        this.tripListChangedEvent.next(this.trips.slice());
      },
      (error: any) => {
        console.error('Failed to fetch trips:', error);
      }
    );
  }
  

  getTrip(id: string): Observable<Trip | null> {
    const trip = this.trips.find(c => c.id === id) || null;
    return of(trip);
  }

  getMaxId(): number {
    let maxId = 0;
    for (const trip of this.trips) {
      const currentId = parseInt(trip.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addTrip(newTrip: Trip) {
    if (!newTrip) {
      return;
    }

    this.maxTripId++;
    newTrip.id = this.maxTripId.toString();
    this.trips.push(newTrip);
    this.storeTrips().subscribe();
  }

  updateTrip(id: string, newTrip: Trip): Observable<void> {
    const pos = this.trips.findIndex(trip => trip.id === id);
    if (pos < 0) {
      return of();
    }

    newTrip.id = id;
    this.trips[pos] = newTrip;
    return this.storeTrips();
  }

  deleteTrip(trip: Trip): Observable<void> {
    const pos = this.trips.findIndex(t => t.id === trip.id);
    if (pos < 0) return of();
  
    this.trips.splice(pos, 1);
    this.tripListChangedEvent.next(this.trips.slice()); 
    return this.storeTrips();
  }
  
  
}