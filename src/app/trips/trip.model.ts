export class Trip {
  constructor(
    public id: string,
    public destination: string,
    public startDate: Date,
    public endDate: Date,
    public imageUrl: string,
    public tasks: Task[],
    public itinerary: ItineraryItem[] 
  ) {}
}

export class Task {
  constructor(
    public id: string,
    public title: string, 
    public completed: boolean
  ) {}
}

export class ItineraryItem {
  constructor(
    public id: string,
    public dateStart: Date,
    public dateEnd: Date,
    public title: string,
    public startTime: string, 
    public endTime: string,
    public category: string,
    public description: string, 
    public location: string,
    public link: string
  ) {}
}
