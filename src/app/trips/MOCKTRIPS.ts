import { Trip, Task, ItineraryItem } from './trip.model';

export const MOCKTRIPS: Trip[] = [
  new Trip(
    "1",
    "New York City",
    new Date("2024-10-19"),
    new Date("2024-10-22"),
    "nyc.jpg",
    [
      new Task("1", "Book hotel", false),
      new Task("2", "Plan subway routes", true)
    ],
    [
      new ItineraryItem(
        "1",
        new Date("2024-10-19"),
        new Date("2024-10-20"),               
        "Visit Central Park",  
        "10:00 AM",
        "10:30 AM",
        "Explore the famous park in the heart of Manhattan.", 
        "Central Park, Manhattan, NY", 
        "https://www.centralparknyc.org/" 
      ),
      new ItineraryItem(
        "2",
        new Date("2024-10-20"),
        new Date("2024-10-20"),
        "Empire State Building Tour",
        "2:00 PM",
        "3:00 PM",
        "A guided tour to the top of the Empire State Building for stunning views of NYC.",
        "Empire State Building, NYC", 
        "https://www.esbnyc.com/"
      )
    ]
  ),
  new Trip(
    "2",
    "Paris",
    new Date("2025-06-10"),
    new Date("2025-06-24"),
    "paris.jpg",
    [
      new Task("1", "Reserve Eiffel Tower tickets", false),
      new Task("2", "Learn basic French phrases", true)
    ],
    [
      new ItineraryItem(
        "1",
        new Date("2025-06-12"),
        new Date("2025-06-12"),
        "Louvre Museum Visit",
        "9:00 AM",
        "12:00 PM",
        "A tour through the world-famous museum, home to the Mona Lisa.",
        "Louvre Museum, Paris", 
        "https://www.louvre.fr/en"
      ),
      new ItineraryItem(
        "2",
        new Date("2025-06-13"),
        new Date("2025-06-13"),
        "Seine River Cruise",
        "7:00 PM",
        "8:30 PM",
        "A relaxing boat cruise along the Seine River, offering picturesque views of Paris landmarks.",
        "Seine River, Paris", 
        "https://www.bateauxparisiens.com/"
      )
    ]
  )
];

