import { DatageneratorService } from './datagenerator.service';
import { Component, OnInit, OnDestroy, AfterContentInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { StackChartComponent } from './stack-chart/stackchart.component';
import { HtmlTableComponent } from './html-table/html-table.component';
export class yearlyproduce {
  year: string;
  apples: number;
  bananas:number;
  cherries:number;
  dates:number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
 
  @ViewChild('ProduceByYearChart', { static: true }) chart: StackChartComponent;
  @ViewChild('ProduceByYearTable', { static: true }) mattable: HtmlTableComponent;
  chartData: yearlyproduce[] = [];
  constructor( private DatageneratorService: DatageneratorService) { 
   }

  ngOnInit() {
  }

  initialize() {
   this.chartData=this.DatageneratorService.getData();

  }

  ngAfterContentInit() {
    this.initialize();
    //  this.generateData();
  }

  generateData() {
       this.DatageneratorService.genNewData();
       this.chartData=this.DatageneratorService.getData();
  }
 
}




