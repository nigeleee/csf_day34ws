export class Weather {
  constructor (
    public cityName: string,
    public temp: number,
    public pressure: number,
    public humidity: number,
    public description: string,
    public sunrise: number,
    public sunset: number
  ) { }
}



// export interface Weather {
//    cityName: string;
//    temp: number;
//    humidity: number;
//    description: string;
//    sunrise: number;
//    sunset: number;
// }

