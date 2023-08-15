import { Weather } from './../model/weather';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WeatherService } from '../service/weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  form!: FormGroup;
  city! : string;
  formattedSunrise!: string;
  formattedSunset!: string;

  constructor(private fb: FormBuilder, private weatherSvc : WeatherService, private datePipe : DatePipe) {}

  OPEN_WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1";
  model = new Weather("Singapore", 0,0,0,"",0,0);
  subscription!: Subscription;

  ngOnInit(): void {
      this.form = this.createForm();
  }

  createForm() {
   return this.fb.group({
      city: new FormControl('', [Validators.required])
    })
  }

  searchWeather() {
    console.log('Search weather');
    this.city=this.form.value["city"];
    console.log(this.city);

    this.subscription = this.weatherSvc.getWeather(this.city, this.OPEN_WEATHER_API_KEY)
    .subscribe((data:any) => {
      console.log(data);

      this.model = new Weather(
        this.city,
        data.main.temp,
        data.main.pressure,
        data.main.humidity,
        data.weather[0].description,
        data.sys.sunrise,
        data.sys.sunset
      );
      this.formattedSunrise = this.datePipe.transform(new Date(this.model.sunrise * 1000), 'mediumTime');
      this.formattedSunset = this.datePipe.transform(new Date(this.model.sunset * 1000), 'mediumTime');
    })
  }
}
