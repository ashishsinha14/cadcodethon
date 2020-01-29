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

export interface RiskData {
  rownum: number;
  account_name: string;
  inv_horizon: string;
  inv_obj_least: number;
  inv_obj_most: number;
  inv_obj_imp: number;
  inv_obj_some_imp: number;
  inv_amount: number;
  liquidy_need: string;
  model_id: number;
  model_name: string;
  primary_fin_need: string;
  risk_profile: number;
  risk_tolerance: number;
  volatility: number;
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
    { value: 0, viewValue: 'Wealth Accumulation/Investment' },
    { value: 1, viewValue: 'Retirement' },
    { value: 2, viewValue: 'Education Planning' },
    { value: 3, viewValue: 'Current Income' },
    { value: 4, viewValue: 'Estate/Legacy Planning' },
    { value: 5, viewValue: 'Major Purchase/Expense' },
    { value: 6, viewValue: 'Wealth Accumulation/Investment' },
    { value: 7, viewValue: 'Major Purchase Income' },
  ];

  invHorizon: Objective[] = [
    { value: 0, viewValue: '11 to 20 Years' },
    { value: 1, viewValue: 'Over 20 Years' },
    { value: 3, viewValue: '6 to 10 Years' },
    { value: 4, viewValue: 'Immediate' },
    { value: 5, viewValue: '2 to 5 Years' },
    { value: 6, viewValue: 'Less than 2 Years' },
    { value: 7, viewValue: '11 to 20 Years' }
  ];

  liqNeed: Objective[] = [
    { value: 0, viewValue: '11 to 20 Years' },
    { value: 1, viewValue: 'Over 20 Years' },
    { value: 3, viewValue: '6 to 10 Years' },
    { value: 4, viewValue: 'Immediate' },
    { value: 5, viewValue: '2 to 5 Years' },
    { value: 6, viewValue: 'Less than 2 Years' },
    { value: 7, viewValue: '11 to 20 Years' }
  ];

  Http: HttpClient;
  BaseURL: string;
  Headers: any;
  rskProfile:any;
  request: any;

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

    //   //console.log("LogOn.OnClick * pControl=" + pControl);
    this.Http.post(this.BaseURL + 'generic', this.request, { headers: this.Headers })
      .subscribe(result => {
        // alert("Posted" + JSON.stringify(result));
        this.rskProfile = (result as RiskData).risk_profile;
        this.eventBusService.saveData(result);
      }, error => console.error(error));


  }
  sendMessage(data): void {
    // send message to subscribers via observable subject
    this.eventBusService.sendMessage(data);
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

  selChange(event, id) {
    this.request = this.createRequest();
    if(event.id === 'MI') {
      this.request.inv_obj_most = event.value;
    } else if(event.id === 'VI') {
      this.request.inv_obj_imp = event.value;
    } else if(event.id === 'SI') {
      this.request.inv_obj_some_imp = event.value;
    } else if(event.id === 'LI') {
      this.request.inv_obj_least = event.value;
    } else if(event.id === 'Risk Tolerance') {
      this.request.risk_tolerance = event.value;
    } else if(event.id === 'Liquidty Need') {
      this.request.liquidy_need = event.value;
    } else if(event.id === 'Time Horizon') {
      this.request.inv_horizon = event.value;
    }
    this.request.rownum = 0;
    this.request.account_name = '';
    this.request.volatility = 8.04;
    this.request.primary_fin_need = '';
    this.request.inv_amount = 100;
    this.request.model_id = null;
    this.request.model_name = '';
  }

}
