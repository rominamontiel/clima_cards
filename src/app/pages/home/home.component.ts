import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public weather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWeather()
    .subscribe(
      res => {this.weather = res;console.log(res)},
      err => console.log(err)
    );
  }

}
