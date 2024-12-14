import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripsComponent } from "./trips/trips.component";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { UserComponent } from "./user/user.component";
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TripsComponent, HeaderComponent, CommonModule, UserComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  selectedFeature: string = 'home';
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
