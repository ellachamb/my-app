import { Component, Input } from '@angular/core';
import { Trip } from '../trip.model';
import { DetailNavComponent } from "./detail-nav/detail-nav.component";
import { ItineraryComponent } from "./itinerary/itinerary.component";
import { TodoComponent } from "./todo/todo.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [DetailNavComponent, ItineraryComponent, TodoComponent, CommonModule],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent {
  @Input() trip!: Trip;
  selectedFeature: string = 'calendar';
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
