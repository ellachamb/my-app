import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, ItineraryItem } from '../../trip.model';
import { NgForm, FormsModule } from '@angular/forms';
import { ItineraryService } from './itinerary.service';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ItineraryService],
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnChanges, OnInit {
  @Input() trip!: Trip;  // Expecting a trip to be passed into this component
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
    '',
    ''
  );

  selectedItem: ItineraryItem | null = null;
  itineraryItems: { [key: string]: ItineraryItem[] } = {};

  constructor(private itineraryService: ItineraryService) {}

  ngOnInit(): void {
    if (this.trip && this.trip.id) {
      this.initializeItineraryItems(); 
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trip'] && this.trip && this.trip.id) {
      this.initializeItineraryItems();  
    }
  }

  private initializeItineraryItems(): void {
    if (this.trip && this.trip.id) {
      this.itineraryService.loadItineraryItems(this.trip.id);  
      this.itineraryItems = this.itineraryService.getItineraryItemsByTrip(this.trip);
    }
  }

  getDatesInRange(startDate: Date | string, endDate: Date | string): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    while (currentDate <= endDateObj) {
      // Add one day to the current date before pushing it to the array
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1); // Add one day to the current date
      dates.push(nextDate); // Push the updated date to the array
      
      currentDate.setDate(currentDate.getDate() + 1); // Increment currentDate by one day
    }
  
    return dates;
  }
  
  

  getItemsForDate(date: Date): ItineraryItem[] {
    return this.itineraryService.getItemsForDate(date); 
  }

  addItem(date: Date): void {
    this.newItem.dateStart = new Date(date);
    this.newItem.dateEnd = new Date(date);
    this.showModal = true;  
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.trip && this.trip.id) {
      const newItineraryItem: ItineraryItem = {
        id: this.generateId(), 
        title: form.value.title,
        dateStart: (new Date(form.value.dateStart)),  
        dateEnd: (new Date(form.value.dateEnd)),      
        startTime: this.convertTo12HourFormat(form.value.startTime),
        endTime: this.convertTo12HourFormat(form.value.endTime),
        category: form.value.category,
        description: form.value.description,
        location: form.value.location,
        link: form.value.link
      };
  
      this.itineraryService.addItineraryItem(newItineraryItem, this.trip.id);
  
      this.showModal = false;
      document.getElementById('closeModalButton2')?.click(); 
      form.reset();  
  
    
      this.initializeItineraryItems();
    }
  }

  convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':').map(n => parseInt(n, 10));
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;  
    const minute = minutes.toString().padStart(2, '0'); 
    return `${hour12}:${minute} ${period}`;
  }
  

  showItemDetails(item: ItineraryItem): void {
    this.selectedItem = item;  
  }

  closeModal(): void {
    this.showModal = false;  
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9); 
  }

  getCategoryColor(category: string): string {
    switch (category?.toLowerCase()) {
      case 'travel': return 'navy';
      case 'accommodation': return 'green';
      case 'activity': return 'lightcoral';
      case 'restaurant': return 'purple';
      case 'other': return 'orange';
      default: return 'lightgray'; 
    }
  }
}
