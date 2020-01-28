import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Article } from 'src/app/shared/article.interface';
import { ObservableService } from 'src/app/shared/observable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modelcreate',
  templateUrl: './modelcreate.component.html',
  styleUrls: ['./modelcreate.component.css']
})
export class ModelcreateComponent implements OnInit, OnDestroy {
  message: any = {};
  subscription: Subscription;
  detail: any = {};
  constructor(private eventBusService: EventBusService, private observableService: ObservableService) {
    // this.eventBusService.on('SelectArticleDetail', (data: Article) => {
    //   this.riskData = data;
    //   this.riskData.title = 'Mr';
    // });
    this.subscription = this.eventBusService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
    this.eventBusService.on('SelectArticleDetail', (data:Article) => {
      this.detail = data;
    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
