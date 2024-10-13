export class Trip {
    constructor(
      public id: string,
      public destination: string,
      public startDate: Date,
      public endDate: Date,
      public imageUrl: string
    ) {}
  }