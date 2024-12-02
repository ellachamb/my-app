import { Component, Input } from '@angular/core';
import { Trip } from '../trip.model';
import { TripsService } from '../trips.service'; 
import { CommonModule } from '@angular/common';
import { DetailNavComponent } from './detail-nav/detail-nav.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [DetailNavComponent, ItineraryComponent, TodoComponent, CommonModule],
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent {
  @Input() trip!: Trip;
  selectedFeature: string = 'calendar';

  constructor(private tripsService: TripsService) {}

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }

  editTrip() {
    const updatedTrip: Trip = {
      ...this.trip,
      destination: prompt('Edit destination:', this.trip.destination) || this.trip.destination,
      imageUrl: prompt('Edit image URL:', this.trip.imageUrl) || this.trip.imageUrl,
    };

    this.tripsService.updateTrip(this.trip.id, updatedTrip);
    this.trip = updatedTrip; 
  }

  deleteTrip() {
    if (confirm(`Are you sure you want to delete the trip to ${this.trip.destination}?`)) {
      this.tripsService.deleteTrip(this.trip.id);
    }
  }
  
}
