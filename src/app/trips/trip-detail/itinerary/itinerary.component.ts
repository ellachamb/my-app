import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../trip.model';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css'
})
export class ItineraryComponent {
  @Input() trip!: Trip;
  
  getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate)); 
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}
