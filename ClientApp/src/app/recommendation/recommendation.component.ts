import { Component, Inject, OnInit } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { EventBusService } from 'src/app/shared/event-bus.service';

export interface Recommendation {
  Name: string,
  MarketCap: number,
  Sector: string,
  Industry: string,
  L2: string,
  close_price: number,
  risk_score: number,
  return_2019: number,
  return_2018: number,
  return_2017: number,
  return_2016: number,
  return_2015: number,
  return_2014: number,
  return_2013: number,
  return_2012: number,
  return_2011: number,
  return_2010: number,
  position: number
}


const ELEMENT_DATA: Recommendation[] = [
  // { position: 1, name: 'Hydrogen',  symbol: 'H' },
  // { position: 2, name: 'Helium', symbol: 'He' },
  // { position: 3, name: 'Lithium',  symbol: 'Li' },
  // { position: 4, name: 'Beryllium',  symbol: 'Be' },
  // { position: 5, name: 'Boron', symbol: 'B' },
  // { position: 6, name: 'Carbon',  symbol: 'C' },
  // { position: 7, name: 'Nitrogen',  symbol: 'N' },
  // { position: 8, name: 'Oxygen',  symbol: 'O' },
  // { position: 9, name: 'Fluorine',  symbol: 'F' },
  // { position: 10, name: 'Neon',  symbol: 'Ne' },
];

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'Name',
    'L2', 'risk_score', 'return_2019', 'return_2018', 'return_2017',
    'return_2016', 'return_2015'];


  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  riskData;
  selectedRows = [];

  Http: HttpClient;
  BaseURL: string;
  Headers: any;

  recommendations: Recommendation[] = [];
  dataSource = new MatTableDataSource<Recommendation>(this.recommendations);
  selection = new SelectionModel<Recommendation>(true, []);

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogdata: any,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private dialogRef: MatDialogRef<RecommendationComponent>,
    private eventBusService: EventBusService) {
    this.Http = http;
    this.BaseURL = baseUrl;
    this.Headers = new Headers();
    this.Headers.append('contentType', 'application/json');
    if (dialogdata) {
      this.message = dialogdata.message || this.message;
      if (dialogdata.buttonText) {
        this.confirmButtonText = dialogdata.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = dialogdata.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.selectedRows = [];
  }

  ngOnInit() {
    this.riskData = this.eventBusService.getData();
    console.log(this.riskData);
    const translatedrskData = {
      "inv_horizon": 2.0,
      "inv_obj_least_imp": this.riskData.inv_obj_least,
      "inv_obj_most_imp": this.riskData.inv_obj_most,
      "inv_obj_some_imp": this.riskData.inv_obj_some_imp,
      "inv_obj_very_imp": this.riskData.inv_obj_imp,
      "investment_amt": this.riskData.inv_amount,
      "liquidity_need": this.riskData.liquidy_need,
      "primary_fin_need": this.riskData.primary_fin_need,
      "risk_profile": this.riskData.risk_profile,
      "risk_tolerance": this.riskData.risk_tolerance,
      "volatility": this.riskData.volatility
    }
    //     rownum: 0
    // account_name: ""
    // inv_horizon: "Less than 12 Years"
    // inv_obj_least: 0
    // inv_obj_most: 1
    // inv_obj_imp: 0
    // inv_obj_some_imp: 4
    // inv_amount: 100
    // liquidy_need: "Lump Sum"
    // model_id: 1022
    // model_name: ""
    // primary_fin_need: ""
    // risk_profile: 1
    // risk_tolerance: 1
    // volatility: 8.04
    // const input = { "inv_horizon": 2.0, "inv_obj_least_imp": 0.0, "inv_obj_most_imp": 2.0, "inv_obj_some_imp": 0.0, "inv_obj_very_imp": 4.0, "investment_amt": 745791.0, "liquidity_need": 2.0, "primary_fin_need": 7.0, "risk_profile": 2.0, "risk_tolerance": 0.0, "volatility": 13.94 };
    // "rownum": 0,
    //     "account_name": "",
    //     "inv_horizon": "Less than 12 Years",
    //     "inv_obj_least": 0,
    //     "inv_obj_most": 1,
    //     "inv_obj_imp": 0,
    //     "inv_obj_some_imp": 4,
    //     "inv_amount": 100,
    //     "liquidy_need": "Lump Sum",
    //     "model_id": 1021,
    //     "model_name": "",
    //     "primary_fin_need": "",
    //     "risk_profile": 1,
    //     "risk_tolerance": 1,
    //     "volatility": 8.04,
    //     "modelHoldings": null
    const data = encodeURIComponent(JSON.stringify(translatedrskData));
    console.log(data);
    this.Http.get<any>(this.BaseURL + 'recommendation/' + data).subscribe(result => {
      if (result && result.length > 0) {
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          element.position = index + 1;
          this.recommendations.push(element);
        }
      }
      // this.recommendations = result;
      console.log(this.recommendations);
      this.dataSource._updateChangeSubscription();
      // alert("Posted" + JSON.stringify(result));
    }, error => console.error(error));
  }



  onConfirmClick(): void {
    this.dialogRef.close({ data: this.selectedRows });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    if(numSelected === numRows && numRows !== 0) {
      this.selectedRows = this.dataSource.data;
    }
    return numSelected === numRows;
  }

  private selectRow($event, row) {
    // console.log($event.checked);
    if ($event.checked) {
      console.log(row.name);
      if (this.selectedRows.length == 0) {
        this.selectedRows.push(row);
      } else {
        const idx = this.selectedRows.findIndex(itm => itm.position === row.position);
        if (idx === -1) {
          this.selectedRows.push(row);
        } 
      }
    } else {
      const idx = this.selectedRows.findIndex(itm => itm.position === row.position);
        if (idx !== -1) {
          this.selectedRows = this.selectedRows.filter(itm => itm.position === row.position);
        } 
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Recommendation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}