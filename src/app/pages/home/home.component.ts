import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public weather;
  public city:string;
  public temp:number;
  public icon:string;
  public descr:string;
  public hum:number;
  public wind:number;
  public windDeg:number;
  public st:number;
  public press:number;
  public currentDate = new Date();
  public tempPercentage = '50%';

  public daysWeekName = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  public monthsName = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  public month = this.monthsName[this.currentDate.getMonth()];
  public dayWeek = this.daysWeekName[this.currentDate.getDay()]; 
  public day = this.currentDate.getDate();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWeather()
    .subscribe(
      res => {
        this.weather = res;
        console.log(res),
        this.setData()
      },
      err => console.log(err)
    );  
  }

  public setData(){
    this.city = this.weather.name;
    this.temp = this.weather.main.temp.toFixed(0);
    this.icon = this.weather.weather[0].icon;
    this.descr = this.weather.weather[0].description;
    this.hum = this.weather.main.humidity;
    this.wind = this.weather.wind.speed.toFixed(0);
    this.windDeg = this.weather.wind.deg;
    this.st = this.weather.main.feels_like.toFixed(1);
    this.press = this.weather.main.pressure;
    this.tempPercentage = `${(this.temp * 100) / 40}%`;
  }
}
