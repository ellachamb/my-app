import { Injectable, EventEmitter } from '@angular/core';
import { ItineraryItem, Trip } from '../../trip.model';
import { MOCKTRIPS } from '../../MOCKTRIPS';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private items: ItineraryItem[] = [];  // Store all itinerary items

  constructor() {
    this.loadItineraryItems();
  }

  loadItineraryItems(): void {
    this.items = MOCKTRIPS.flatMap(trip => trip.itinerary);  // Flatten all itinerary items from MOCKTRIPS
  }

  getItineraryItems(): ItineraryItem[] {
    return [...this.items];  // Return a copy of the items
  }

  getItineraryItemsByTrip(trip: Trip): { [key: string]: ItineraryItem[] } {
    const itineraryItems = trip.itinerary || [];
    const groupedItems = itineraryItems.reduce((acc: { [key: string]: ItineraryItem[] }, item: ItineraryItem) => {
      const startDate = new Date(item.dateStart);
      startDate.setHours(0, 0, 0, 0);  // Set to midnight for consistent comparison

      const startDateString = startDate.toISOString().split('T')[0];  // Convert to YYYY-MM-DD format

      if (!acc[startDateString]) acc[startDateString] = [];
      acc[startDateString].push(item);

      return acc;
    }, {});

    return groupedItems;
  }

  getItemsForDate(date: Date): ItineraryItem[] {
    const targetDateString = this.getDateString(date);  // Get the date in YYYY-MM-DD format

    return this.items.filter(item => {
      const itemStartDate = new Date(item.dateStart);
      itemStartDate.setHours(0, 0, 0, 0);  // Set the item date to midnight
      const itemEndDate = new Date(item.dateEnd);
      itemEndDate.setHours(23, 59, 59, 999);  // Ensure the end date is at the end of the day

      const itemStartDateString = this.getDateString(itemStartDate);
      const itemEndDateString = this.getDateString(itemEndDate);

      // Check if the current date is between the start and end date (inclusive)
      return (targetDateString >= itemStartDateString && targetDateString <= itemEndDateString);
    });
  }

  addItineraryItem(item: ItineraryItem): void {
    this.items.push(item);  // Add the item to the list
  }

  private getDateString(date: Date): string {
    // Format date as YYYY-MM-DD to ensure consistent comparison
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
