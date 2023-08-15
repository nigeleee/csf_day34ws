import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http : HttpClient) { }

private apiURL : string = 'https://api.openweathermap.org/data/2.5/weather';

//using Observable
getWeather(city: string, key: string) : Observable<any> {
  const params = new HttpParams()
  .set('q', city)
  .set('appid', key);

  return this.http.get<Weather>(this.apiURL, { params });
}

}
