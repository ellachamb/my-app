import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-nav',
  standalone: true,
  imports: [],
  templateUrl: './detail-nav.component.html',
  styleUrl: './detail-nav.component.css'
})
export class DetailNavComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
