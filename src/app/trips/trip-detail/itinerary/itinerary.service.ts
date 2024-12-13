import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItineraryItem, Trip } from '../../trip.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private items: ItineraryItem[] = [];
  private firebaseUrl = 'https://itinerary-4e733-default-rtdb.firebaseio.com/';
  maxItemId: number = 0;
  
  constructor(private http: HttpClient) {}

  loadItineraryItems(tripId: string): void {
    const url = `${this.firebaseUrl}/trips/${tripId}/itinerary.json`;

    this.http.get<{ [key: string]: ItineraryItem }>(url).subscribe(
      (response: { [key: string]: ItineraryItem } | null) => {
        if (response) {
          this.items = Object.keys(response).map(key => {
            return { ...response[key], id: key };
          });
        } else {
          this.items = [];
        }
      },
      error => {
        console.error('Error fetching itinerary items from Firebase:', error);
        this.items = [];
      }
    );
  }

  getItineraryItems(): ItineraryItem[] {
    return [...this.items];
  }

  getItineraryItemsByTrip(trip: Trip): { [key: string]: ItineraryItem[] } {
    const itineraryItems = Array.isArray(trip.itinerary) ? trip.itinerary : [];
    const groupedItems = itineraryItems.reduce((acc: { [key: string]: ItineraryItem[] }, item: ItineraryItem) => {
      const startDate = new Date(item.dateStart);
      startDate.setHours(0, 0, 0, 0);

      const startDateString = startDate.toISOString().split('T')[0];

      if (!acc[startDateString]) acc[startDateString] = [];
      acc[startDateString].push(item);

      return acc;
    }, {});

    return groupedItems;
  }

  getItemsForDate(date: Date): ItineraryItem[] {
    const targetDateString = this.getDateString(date);
    
    return this.items.filter(item => {
      // Create a copy of the start and end dates to modify them
      const itemStartDate = new Date(item.dateStart);  
      itemStartDate.setHours(0, 0, 0, 0);
      itemStartDate.setDate(itemStartDate.getDate() + 1); // Add one day to start date
  
      const itemEndDate = new Date(item.dateEnd); 
      itemEndDate.setHours(23, 59, 59, 999);
      itemEndDate.setDate(itemEndDate.getDate() + 1); // Add one day to end date
  
      // Convert the modified dates back to string
      const itemStartDateString = this.getDateString(itemStartDate);
      const itemEndDateString = this.getDateString(itemEndDate);
  
      // Check if the target date is between the modified start and end date
      return (targetDateString >= itemStartDateString && targetDateString <= itemEndDateString);
    });
  }
  
  

  addItineraryItem(item: ItineraryItem, tripId: string): void {
    const tripUrl = `${this.firebaseUrl}/trips/${tripId}/itinerary.json`;
  
    item.dateStart = new Date(item.dateStart);
    item.dateEnd = new Date(item.dateEnd);
  
    const formattedDateStart = this.formatDate(item.dateStart);
    const formattedDateEnd = this.formatDate(item.dateEnd);
  
    this.http.post<{ name: string }>(tripUrl, {
      ...item,
      dateStart: formattedDateStart,
      dateEnd: formattedDateEnd
    }).subscribe(response => {
      console.log('Itinerary item added:', response);
      const newItemId = response.name;
      item.id = newItemId;
  
      this.items.push(item);
    }, error => {
      console.error('Error adding itinerary item:', error);
    });
  }
  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  private getDateString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; 
  }
  
}
