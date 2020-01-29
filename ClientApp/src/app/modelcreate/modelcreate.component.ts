import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Article } from 'src/app/shared/article.interface';
import { ObservableService } from 'src/app/shared/observable.service';
import { TypeAheadService } from 'src/app/shared/product-typeahead.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Transaction {
  sector: string;
  industry: string;
  asset_class: string;
  product_name: string;
  symbol: string;
  allocation: number;
  marketcap: number;
  risk_score: number;
  close_price: number;
  rownum: number;
}

@Component({
  selector: 'app-modelcreate',
  templateUrl: './modelcreate.component.html',
  styleUrls: ['./modelcreate.component.css'],
  providers: [TypeAheadService]
})
export class ModelcreateComponent implements OnInit, OnDestroy {
  message: any = {};
  subscription: Subscription;
  detail: any = {};

  // searchTerm = new FormControl();
  options: any[] = [{ticker: 'MS', name: 'Microsoft'},{ticker: 'AAPL', name: 'Apple Inc.'},{ticker: 'TSLA', name: 'Tesla'},
  {ticker: 'FB', name: 'Facebook'}];
  

  product;
  

  filteredOptions: Observable<string[]>;

  displayedColumns = ['sector', 'industry', 'asset_class', 'product_name', 'symbol','allocation', 'marketcap', 'risk_score', 'close_price','rownum'];
  transactions: Transaction[] = [
    
  ];

  response = {"rownum": 38,
			"product_name": "Acer Therapeutics Inc.",
			"sector": "Health Care",
			"asset_class": "Micro Cap",
			"close_price": 4.04,
			"risk_score": 167.94,
			"return_2019": -80.07,
			"return_2018": 45.27,
			"return_2017": 44.52,
			"return_2016": -66.79,
			"return_2015": -51.91,
			"return_2014": -60.44,
			"return_2013": 59.65,
			"return_2012": -69.35,
			"return_2011": -36.73,
			"return_2010": -22.63,
			"symbol": "ACER",
			"marketcap": 4.371211208E7,
			"industry": "Major Pharmaceuticals"}


  dataSource = new MatTableDataSource<Transaction>(this.transactions);
  searchTerm : FormControl = new FormControl();
  constructor(private eventBusService: EventBusService, private observableService: ObservableService, private service: TypeAheadService) {
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

    this.filteredOptions = this.searchTerm.valueChanges.pipe(
      // startWith(''),
      map(value => this._filter(value))
    );

    // this.searchTerm.valueChanges.subscribe(
    //   term => {
    //     if (term != '') {
    //       this.service.search(term).subscribe(
    //         data => {
    //           // Commented Temporarily
    //           // this.options = data as any[];
    //           this.options = this.dummyData;
    //           //console.log(data[0].BookName);
    //       })
    //     }
    // });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.allocation).reduce((acc, value) => acc + value, 0);
  }

  getPosts(event) {
    // alert(event.option.value);
    console.log(event.option.value);
    this.product = this.service.getProductById(event.option.value.ticker);
    const newItem: Transaction = this.createRowData();
    this.dataSource.data.push(newItem);  //add the new model object to the dataSource
    this.dataSource.data = [...this.dataSource.data];  //refresh the dataSource
    this.dataSource._updateChangeSubscription();
  }

  createRowData() {
    // 'sector', 'industry', 'asset_class', 'product_name', 'symbol','allocation', 'marketcap', 'risk_score', 'close_price','rownum'
    const row : Transaction = {
      sector : this.response.sector,
      industry: this.response.industry,
      asset_class: this.response.asset_class,
      product_name: this.response.product_name,
      symbol: this.response.symbol,
      allocation: 0,
      marketcap: this.response.marketcap,
      risk_score: this.response.risk_score,
      close_price: this.response.close_price,
      rownum: this.response.rownum
    }
    return row;
  }
  

  private _filter(value: string): string[] {
    const filterValue = typeof(value) !== 'object'? value.toLowerCase(): value;

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(option) {
    if(option) {
      return option.name;
    }
  }

  showRecommendations() {

  }

}
