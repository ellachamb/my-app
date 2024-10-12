import { Component, Input } from '@angular/core';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent {
  @Input() trip!: Trip;
}
