import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Article } from 'src/app/shared/article.interface';
import { ObservableService } from 'src/app/shared/observable.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-modelcreate',
  templateUrl: './modelcreate.component.html',
  styleUrls: ['./modelcreate.component.css']
})
export class ModelcreateComponent implements OnInit, OnDestroy {
  message: any = {};
  subscription: Subscription;
  detail: any = {};

  myControl = new FormControl();
  options: any[] = [{ticker: 'MS', name: 'Microsoft'},{ticker: 'AAPL', name: 'Apple Inc.'},{ticker: 'TSLA', name: 'Tesla'},
  {ticker: 'FB', name: 'Facebook'}];
  

  filteredOptions: Observable<string[]>;

  displayedColumns = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  dataSource = new MatTableDataSource<Transaction>(this.transactions);

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

    this.filteredOptions = this.myControl.valueChanges.pipe(
      // startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  getPosts(event) {
    // alert(event.option.value);
    console.log(event.option.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(state) {
    if(state) {
      return state.name;
    }
  }

  showRecommendations() {

  }

}
