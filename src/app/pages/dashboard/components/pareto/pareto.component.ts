import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as _ from 'lodash';
import { UnitsService } from 'app/services/units.service';

@Component({
  selector: 'app-pareto',
  templateUrl: './pareto.component.html',
  styleUrls: ['./pareto.component.scss']
})
export class ParetoComponent implements OnChanges, OnInit {
  @Input('data') data = [];
  @Input('name') name = 'name';
  @Input('value') value = 'value';
  @Input('occurances') occurances = 'occurances';
  @Input('topItems') topItems = 0;
  @Input('type') type;
  @Input('title') title = '';

  units = '';
  vm = [];


  constructor(private unitService: UnitsService) { }

  ngOnInit() {
    this.vm = this.calculateParetoVm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const data: SimpleChange = changes.data;
    if (data.previousValue !== data.currentValue) {
      this.vm = this.calculateParetoVm();
    }
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    // this._name = name.currentValue.toUpperCase();
  }

  getWidth(width = 0) {
    return {width: `${width * 100}%`};
  }

  calculateParetoVm() {
    // Create a standardized data array using the provided accessor names
    const tempValues = this.data.map((o) => {
      return {name: o[this.name], value: o[this.value], occurances: o[this.occurances]};
    });
    // console.log(tempValues);
    // Sort the array by descending value
    /*global _ */
    _.sortBy(tempValues, (o) => -1 * o.value);

    // Initialize the view model
    let vm = [];
    const other = {count: 0, total: 0, combinedNames: ''};
    this.units = this.unitService.getUserUnits(this.type);

    for (let i = 0; i < tempValues.length; i++) {
      const newValue = tempValues[i];
      if (newValue.value < 0) {
          continue;
      }
      newValue.value = this.unitService.convertUnits(newValue.value, this.type, 1, this.units);
      if (i < this.topItems) {
        // todo:format from service for ffi&fdi?
        // newValue.toolTipText = newValue.value.toFixed(1) + ' ' + this.units;
        vm.push(newValue);
        // console.log(newValue);
      } else {
        other.total += newValue.value;
        other.count++;
        if (other.combinedNames !== '') {
          other.combinedNames += ', ';
        }
        other.combinedNames += newValue.name + ': ' + newValue.value.toFixed(1);
      }
    }
    if (other.count > 0) {
      vm.push({name: `Other (${other.count})`, value: other.total, toolTipText: other.combinedNames });
    }

    // Find the max and total value
    const maxValue = Math.max.apply(Math, tempValues.map((o) => o.value));
    /*global _ */
    // lodash version required by angular-dc doesn't support _sum
    const sumValues = _.reduce(tempValues, (sum, val) => sum + val.value);

    // Add percentages
    vm = vm.map((o) => {
      o.valuePercent = o.value / sumValues;
      o.barPercent = o.value / maxValue;
      return o;
    });

    return vm;
  }

}
