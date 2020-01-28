import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { EventData } from './../shared/event.class';
import { Article } from 'src/app/shared/article.interface';
import { ObservableService } from 'src/app/shared/observable.service';

export interface Objective {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-riskprofile',
  templateUrl: './riskprofile.component.html',
  styleUrls: ['./riskprofile.component.css']
})
export class RiskprofileComponent implements OnInit {
  incomeobjtives: Objective[] = [
    { value: 'income', viewValue: 'Income' },
    { value: 'aggressiveincome', viewValue: 'Aggressive Income' },
    { value: 'capappreciation', viewValue: 'Capital Appreciation' },
    { value: 'spec', viewValue: 'Speculation' }
  ];

  constructor(private router: Router, private eventBusService: EventBusService,
    private observableService: ObservableService) { }

  ngOnInit() {

  }

  save() {
    const article: Article = {
      id: 1,
      title: 'Risk Data',
      body: 'Rissk Data Body'
    }
    
    this.router.navigate(['/modelcreate/']);
    setTimeout(() => {
      this.eventBusService.emit(new EventData('SelectArticleDetail', article));
    },1000)
    setTimeout(() => {
      this.sendMessage();
    },1010)
  }
  sendMessage(): void {
    // send message to subscribers via observable subject
    this.eventBusService.sendMessage('Message from Home to Create!');
  }

  clearMessage(): void {
    this.eventBusService.clearMessage();
  }

}
