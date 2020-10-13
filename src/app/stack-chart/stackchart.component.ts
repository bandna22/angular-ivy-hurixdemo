import { Component, OnInit, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';

export class yearlyproduce {
  year: string;
  apples: number;
  bananas:number;
  cherries:number;
  dates:number;
}

@Component({
  selector: 'app-stack-chart',
  templateUrl: './stack-chart.component.html',
  styleUrls: ['./stack-chart.component.css']
})
export class StackChartComponent implements OnInit {
    @Input() data: yearlyproduce[];
    @Input() showLabel = 1;
    hostElement; 
    svg; 
    g; 
    colorScale; 
    x; 
    y;
    ymax;
    groups;
    colors = d3.scaleOrdinal(d3.schemeCategory10);

    constructor(private elRef: ElementRef) {
        this.hostElement = this.elRef.nativeElement;
    }

    ngOnInit() { 
   
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data) {
            this.updateChart(changes.data.currentValue);
        }
    }

    private createChart(data: yearlyproduce[]) {
        this.removeChartFromParent();
        this.setChartDims();
        this.setColorScale();
        this.addGElement();
        this.createXAxis();
        this.createYAxis();
        this.createStackBarChart();

    }

    private setChartDims() {
        let viewBoxHeight = 150;
        let viewBoxWidth = 200;
        this.svg = d3.select(this.hostElement).append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '-20 -10 ' + viewBoxWidth + ' ' + viewBoxHeight);
    }

    private addGElement() {
       this.g = this.svg.append("g")
          .attr("transform", "translate(0,0)");
    }

    private setColorScale() {
        this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
     
    }

    private createXAxis() {
       this.groups = d3.map(this.data, function(d){return(d.year)});
         console.log(this.groups)
        this.x = d3.scaleBand()
                .domain(this.groups)
                .range([0, 100])
                .padding([0.2])
    
        this.g.append('g')
            .attr('transform', 'translate(0,90)')
            .attr("stroke-width", 0.5)
            .style('font-size', '6')
            .attr("transform", "translate(0," + 100 + ")")
            .call(d3.axisBottom(this.x).tickSizeOuter(10));

  
    }

    private createYAxis() {
        this.ymax=d3.max(this.data, function(d) { return (d.apples+d.bananas + d.cherries + d.dates); });
        this.y = d3.scaleLinear()
            .domain([0, this.ymax])
            .range([100, 0]);
        this.g.append('g')
            .attr('transform', 'translate(0,0)')
            .attr("stroke-width", 0.5)
            .call(d3.axisLeft(this.y).tickSize(0).tickFormat(<any>''));
        this.g.append('g')
            .attr('transform', 'translate(0,0)')
            .style("stroke-dasharray", ("1,1"))
            .attr("stroke-width", 0.1)
            .call(d3.axisLeft(this.y).ticks(4).tickSize(-50))
            .style('font-size', '6');
        this.g.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(-15,50) rotate(-90)')
            .style('font-size', 8)
            .text('Produce(tonnes)');
        
    }
    private createStackBarChart() {
      console.log("create method");
        let subgroups=['apples','bananas','cherries','dates'];
        let stacked  = d3.stack().keys(['apples', 'bananas', 'cherries', 'dates'])
        let stackedData=stacked(this.data);
        // console.log(stackedData);
        let  color = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range(['#e41a1c','#377eb8','#4daf4a','#ffbbbb'])
        let xfn = d3.scaleBand()
                  .domain(this.groups)
                  .range([0, 100])
                   .padding([0.2])

        let yfn=d3.scaleLinear()
                   .domain([0, 60])
                  .range([ 100,0 ]);
      
        this.g.append("g")
          .selectAll("g")
          .data(stackedData)
          .enter().append("g")
            .attr("fill", function(d) { return color(d.key); })
            .attr("class", function(d){ return "bar bar-" + d.key; })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) {  return xfn(d.data.year); })
            .attr("y", function(d) { return yfn(d[1]); })
            .attr("height", function(d) { return yfn(d[0]) - yfn(d[1]); })
            .attr("width",xfn.bandwidth())
              
        
    }

     private updateStackCharts(changedata) {
      console.log(this.groups);
      let mybars=this.svg;
      let groups=this.groups;
      let index=0
      let subgroups=['apples','bananas','cherries','dates'];
      console.log(groups)
      subgroups.forEach(function(key){

        var bar = d3.select('svg').selectAll(".bar-" + key)
            .transition()
            .attr("height", function(d){ return 0; });
     
      });
        
    }

     private removeChartFromParent() {
          d3.select(this.hostElement).select('svg').remove();
    }

    public updateChart(data: yearlyproduce[]) {
     //console.log(data)
        if (!this.svg) {
            this.createChart(data);
            return;
        }
  
        this.createChart(data);
       //this.updateStackCharts(data);
}

}