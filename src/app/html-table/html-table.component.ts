import { Component, OnInit, ElementRef,ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export class yearlyproduce {
  year: string;
  apples: number;
  bananas:number;
  cherries:number;
  dates:number;
}
@Component({
  selector: 'app-html-table',
  templateUrl: './html-table.component.html',
  styleUrls: ['./html-table.component.css']
})
export class HtmlTableComponent implements OnInit {
    @Input() tabledata: yearlyproduce[];
    keys: string[] = ['year', 'apples', 'bananas', 'cherries','dates'];
  constructor() {


   }

  ngOnInit() {

    console.log(this.tabledata);
  }
  ngOnChanges(changes: SimpleChanges) {
        if (changes.tabledata) {
            //this.updateChart(changes.data.currentValue);
        }
    }
}