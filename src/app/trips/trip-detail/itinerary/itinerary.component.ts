import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, ItineraryItem } from '../../trip.model';
import { NgForm, FormsModule } from '@angular/forms';
import { ItineraryService } from './itinerary.service';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnChanges {
  @Input() trip!: Trip;
  showModal: boolean = false;
  newItem: ItineraryItem = new ItineraryItem(
    '', 
    new Date(), 
    new Date(), 
    '', 
    '', 
    '', 
    '',
    '',
    ''
  );

  selectedItem: ItineraryItem | null = null; 
  itineraryItems: { [key: string]: ItineraryItem[] } = {};

  constructor(private itineraryService: ItineraryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trip'] && this.trip) {
      this.initializeItineraryItems();  // Re-initialize on trip change
    }
  }

  private initializeItineraryItems() {
    if (this.trip && this.trip.itinerary) {
      this.itineraryItems = this.itineraryService.getItineraryItemsByTrip(this.trip);
    }
  }

  getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));  // Push the current date
      currentDate.setDate(currentDate.getDate() + 1);  // Increment by 1 day
    }

    return dates;
  }

  getItemsForDate(date: Date): ItineraryItem[] {
    return this.itineraryService.getItemsForDate(date);  // Use the service to get items for the date
  }

  addItem(date: Date) {
    this.newItem.dateStart = new Date(date);
    this.newItem.dateEnd = new Date(date);
    this.showModal = true;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newItineraryItem: ItineraryItem = {
        id: this.generateId(),
        title: form.value.title,
        dateStart: new Date(form.value.dateStart),
        dateEnd: new Date(form.value.dateEnd),
        startTime: form.value.time,
        endTime: form.value.endTime,
        description: form.value.description,
        location: form.value.location,
        link: form.value.link
      };
      this.itineraryService.addItineraryItem(newItineraryItem);
      this.showModal = false;
      document.getElementById('closeModalButton2')?.click();
      form.reset();
    }
  }

  showItemDetails(item: ItineraryItem) {
    this.selectedItem = item;  // Set selected item to show its details
  }

  closeModal() {
    this.showModal = false;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
