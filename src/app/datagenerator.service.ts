import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Produce} from './produce';
@Injectable({ providedIn: 'root' })
export class DatageneratorService {
 private _produce:Produce[] = [
  {year: '2015', apples: 38, bananas: 9, cherries: 6, dates: 4},
  {year: '2016', apples: 16, bananas: 4, cherries: 6, dates: 14},
  {year: '2017', apples:  14, bananas:  6, cherries: 4, dates: 4},
  {year: '2018', apples:  32, bananas:  8, cherries: 4, dates: 10}
];
 
    genNewData() {
       let x = Math.floor((Math.random() * 10) + 1);
        this._produce=[
          {year: '2015', apples: x+1, bananas: x+5, cherries: x+0, dates: x+2},
  {year: '2016', apples: x+4, bananas: x+2, cherries: 6, dates: 14},
  {year: '2017', apples:  x+2, bananas:  x+0, cherries: x+11, dates: 4},
  {year: '2018', apples:  x+5, bananas:  x+10, cherries:x+2, dates: 10}

        ];
    }
 
    getData(): Produce[] {
        return this._produce;
    }

}