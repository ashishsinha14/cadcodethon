import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { EventData } from './../shared/event.class';
import { Article } from 'src/app/shared/article.interface';
import { ObservableService } from 'src/app/shared/observable.service';
import { HttpClient } from '@angular/common/http';

export interface Objective {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-riskprofile',
  templateUrl: './riskprofile.component.html',
  styleUrls: ['./riskprofile.component.css']
})
export class RiskprofileComponent implements OnInit {

  incomeobjtives: Objective[] = [
    { value: 1, viewValue: 'Income' },
    { value: 2, viewValue: 'Aggressive' },
    { value: 3, viewValue: 'Capital Appreciation' },
    { value: 4, viewValue: 'Speculation' }
  ];


  riskTolerance: Objective[] = [
    { value: 0, viewValue: 'Conservative' },
    { value: 1, viewValue: 'Moderate' },
    { value: 2, viewValue: 'Aggressive' }
  ];

  primFinNeed: Objective[] = [
    { value: 0, viewValue: 'Conservative' },
    { value: 1, viewValue: 'Moderate' },
    { value: 2, viewValue: 'Aggressive' }
  ];

  invHorizon: Objective[] = [
    { value: 0, viewValue: 'Conservative' },
    { value: 1, viewValue: 'Moderate' },
    { value: 2, viewValue: 'Aggressive' }
  ];

  liqNeed: Objective[] = [
    { value: 0, viewValue: 'Conservative' },
    { value: 1, viewValue: 'Moderate' },
    { value: 2, viewValue: 'Aggressive' }
  ];

  Http: HttpClient;
  BaseURL: string;
  Headers: any;

  constructor(private router: Router, private eventBusService: EventBusService,
    private observableService: ObservableService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.Http = http;
    this.BaseURL = baseUrl;
    this.Headers = new Headers();
    this.Headers.append('contentType', 'application/json');
  }

  ngOnInit() {

  }

  save() {
    const article: Article = {
      id: 1,
      title: 'Risk Data',
      body: 'Rissk Data Body'
    }

    // this.router.navigate(['/modelcreate/']);
    // setTimeout(() => {
    //   this.eventBusService.emit(new EventData('SelectArticleDetail', article));
    // },1000)
    // setTimeout(() => {
    //   this.sendMessage();
    // },1010)
    //   //console.log("LogOn.OnClick * pControl=" + pControl);
    this.Http.post(this.BaseURL + 'generic', this.createRequest(), { headers: this.Headers })
    .subscribe(result => { alert("Posted" + JSON.stringify(result)); }, error => console.error(error));
  }
  sendMessage(): void {
    // send message to subscribers via observable subject
    this.eventBusService.sendMessage('Message from Home to Create!');
  }

  clearMessage(): void {
    this.eventBusService.clearMessage();
  }

  createRequest() {
    const request = {
      "rownum": 0,
      "account_name": '',
      "inv_horizon": "Less than 12 Years",
      "inv_obj_least": 0,
      "inv_obj_most": 1,
      "inv_obj_imp": 0,
      "inv_obj_some_imp": 4,
      "inv_amount": 100,
      "liquidy_need": "Lump Sum",
      "model_id": null,
      "model_name": '',
      "primary_fin_need": "Retirement",
      "risk_profile": 0,
      "risk_tolerance": 1,
      "volatility": 8.04
    }
    return request;
  }

}
