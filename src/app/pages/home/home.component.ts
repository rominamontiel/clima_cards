import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public weather;
  public city: string;
  public temp: number;
  public icon: string;
  public descr: string;
  public hum: number;
  public wind: number;
  public windDeg: number;
  public st: number;
  public press: number;
  public wId: number;
  public clouds: number;
  public visibility: number;
  public currentDate = new Date();
  public tempPercentage = '50%';

  public daysWeekName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  public monthsName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public messagesArray = [];
  public messagesArrayPos = 0;

  public month = this.monthsName[this.currentDate.getMonth()];
  public dayWeek = this.daysWeekName[this.currentDate.getDay()];
  public day = this.currentDate.getDate();
  public hour = this.currentDate.getHours();

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

    setInterval(() => {
      if (this.messagesArrayPos > 4) {
        this.messagesArrayPos = 0
      } else {
        this.messagesArrayPos++;
      }
    }, 5000);
  }

  public setData() {
    this.city = this.weather.name;
    this.temp = this.weather.main.temp.toFixed(0);
    this.icon = this.weather.weather[0].icon;
    this.descr = this.weather.weather[0].description;
    this.hum = this.weather.main.humidity;
    this.wind = this.weather.wind.speed.toFixed(0);
    this.windDeg = this.weather.wind.deg;
    this.st = this.weather.main.feels_like.toFixed(1);
    this.press = this.weather.main.pressure;
    this.wId = this.weather.weather[0].id;
    this.clouds = this.weather.clouds.all;
    this.visibility = this.weather.visibility;
    this.tempPercentage = `${(this.temp * 100) / 40}%`;

    this.setMessage_0();
    this.setMessage_1();
    this.setMessage_2();
    this.setMessage_3();
    this.setMessage_4();
    this.setMessage_5();
  }

  public setMessage_0() {
    if (this.hour >= 7 && this.hour <= 12) {
      this.messagesArray[0] = '¡ Buen día !';
    } if (this.hour >= 13 && this.hour <= 18) {
      this.messagesArray[0] = '¡ Buenas tardes !';
    } else {
      this.messagesArray[0] = '¡ Buenas noches !';
    }
  }

  public setMessage_1() {
    if (this.temp < 12) {
      this.messagesArray[1] = 'Hoy es un día frío';
    } if (this.temp > 11 && this.temp < 18) {
      this.messagesArray[1] = 'Hoy es un día fresco';
    } if (this.temp > 17 && this.temp < 26) {
      this.messagesArray[1] = 'Hoy es un día templado';
    } if (this.temp > 25) {
      this.messagesArray[1] = 'Hoy es un dia caluroso';
    }
  }

  public setMessage_2() {
    if (this.wind < 10) {
      this.messagesArray[2] = 'El viento está calmo';
    } if (this.wind > 9 && this.wind < 16) {
      this.messagesArray[2] = 'Hay algo de viento';
    } if (this.wind > 15 && this.wind < 21) {
      this.messagesArray[2] = 'Hay viento moderado';
    } if (this.wind > 20 && this.wind < 26) {
      this.messagesArray[2] = 'Hay bastante viento';
    } if (this.wind > 25) {
      this.messagesArray[2] = '¡El viento está fuerte!';
    }
  }

  public setMessage_3() {
    this.messagesArray[3] = `La nubosidad es del ${this.clouds}%`;
  }

  public setMessage_4() {
    this.messagesArray[4] = `La visibilidad es de ${(this.visibility)/1000} km`;
  }

  public setMessage_5() {
    if (this.press < 1013) {
      this.messagesArray[5] = 'La presión atmosférica es baja';
    } if (this.press >= 1013) {
      this.messagesArray[5] = 'La presión atmosférica es alta';
    }
  }
}