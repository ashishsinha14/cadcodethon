import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    // this.Http = http;
    // this.BaseURL = baseUrl;
    // this.Headers = new Headers();
    // this.Headers.append('Content-Type', 'application/json');
    http.get<any>(baseUrl + 'generic').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
  // public OnClick(pControl: string) {
  //   //console.log("LogOn.OnClick * pControl=" + pControl);
  //   switch (pControl) {
  //     case "Post":
  //       console.log("Post * this.forecast=" + JSON.stringify(this.forecast));
  //       this.Http.post(this.BaseURL + '/api/SampleData/PostWeatherForecast/', this.forecast, { headers: this.Headers })
  //         .subscribe(result => { alert("Posted" + JSON.stringify(result.json())); }, error => console.error(error));
  //       break;
  //   }
  // }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
