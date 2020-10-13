import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Produce} from './produce';
import { AppComponent } from './app.component';
import { StackChartComponent } from './stack-chart/stackchart.component';
import { HtmlTableComponent } from './html-table/html-table.component';
import {MatTableModule} from '@angular/material/table';
import { DatageneratorService } from './datagenerator.service';


@NgModule({
  imports:      [ BrowserModule, MatTableModule ],
  declarations: [ AppComponent, StackChartComponent,HtmlTableComponent], 
  bootstrap:    [ AppComponent ],
  providers: [ DatageneratorService]
})
export class AppModule { }
