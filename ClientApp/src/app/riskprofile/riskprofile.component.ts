import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  incomeobjtives: Objective [] = [
    {value: 'income', viewValue: 'Income'},
    {value: 'aggressiveincome', viewValue: 'Aggressive Income'},
    {value: 'capappreciation', viewValue: 'Capital Appreciation'},
    {value: 'spec', viewValue: 'Speculation'}
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  save() {
    this.router.navigate(['/modelcreate/']);
  }

}
