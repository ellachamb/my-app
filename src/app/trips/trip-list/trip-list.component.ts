import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Trip } from '../trip.model';
import { TripsService } from '../trips.service';
import { NgForm, FormsModule } from '@angular/forms';
import { TripItemComponent } from './trip-item/trip-item.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  imports: [TripItemComponent, FormsModule, CommonModule],
  providers: [TripsService]
})
export class TripListComponent implements OnInit {
  @Output() selectedTripEvent = new EventEmitter<Trip>();
  trips: Trip[] = [];
  subscription!: Subscription;

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.tripsService.getTrips();
    this.subscription = this.tripsService.tripListChangedEvent.subscribe(
      (contactsList: Trip[]) => {
        this.trips = contactsList;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTripSelected(trip: Trip): void {
    this.selectedTripEvent.emit(trip);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newTrip: Trip = {
        id: this.generateId(),
        destination: form.value.destination,
        startDate: new Date(form.value.startDate),
        endDate: new Date(form.value.endDate),
        imageUrl: form.value.imageUrl,
        tasks: [],
        itinerary: []
      };
      this.trips.push(newTrip);
      this.tripsService.addTrip(newTrip);

      document.getElementById('closeModalButton')?.click();

      form.reset();
    }
  }

  private generateId(): string {
    return (this.trips.length + 1).toString();
  }
}