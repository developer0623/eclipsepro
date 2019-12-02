import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from 'app/services/units.service';
import { MachineService } from 'app/services/machine.service';
import { IMetricConfig  } from 'app/models/dto';

@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.scss']
})
export class ConfigTableComponent implements OnInit {
  @Input('data') data: any;
  displayedColumns: string[] = ['show', 'showInMini', 'metric', 'okLower', 'okUpper', 'target', 'max', 'preview'];
  dataSource: any;
  controls: FormArray;

  constructor(private unitsService: UnitsService, private machineService: MachineService) { }

  ngOnInit() {
    console.log('settings', this.data);
    this.dataSource = this.data.settings;
    const toGroups = this.data.settings.map(setting => {
      return new FormGroup({
        okRangeStart:  new FormControl(setting.okRangeStartUser),
        okRangeEnd: new FormControl(setting.okRangeEndUser),
        targetValue: new FormControl(setting.targetValueUser),
        maxValue: new FormControl(setting.maxValueUser)
      }, {updateOn: 'blur'});
    });

    this.controls = new FormArray(toGroups);
  }

  getBaseValue(userValue: number, baseUnit: string, userUnit: string) {
    if (baseUnit === '%') {
      return userValue / 100; // use unitsService for rounding?
    }
    return this.unitsService.convertUnits(userValue, userUnit, 3, baseUnit);
  }

  updateField(index, field, isCheck) {
    let control;
    if (isCheck) {
      control = this.getControl(index, field);
    }
    const payloads: IMetricConfig[] = [];
    this.dataSource = this.dataSource.map((setting, index1) => {
      const newSetting = {...setting};
      if (index === index1 && !isCheck) {
        const userUnit = this.unitsService.getUserUnits(setting.definition.primaryUnits);
        newSetting[field] = this.getBaseValue(control.value, setting.definition.primaryUnits, userUnit);
      } else if (index === index1 && isCheck) {
        newSetting[field] = !newSetting[field];
      }
      const payload = {
          metricId: newSetting.metricId,
          metricName: newSetting.metricName,
          targetValue: newSetting.targetValue,
          okRangeStart: newSetting.okRangeStart,
          okRangeEnd: newSetting.okRangeEnd,
          maxValue: newSetting.maxValue,
          minValue: newSetting.minValue,
          showInMini: newSetting.showInMini,
          showInLarge: newSetting.showInLarge
      };
      payloads.push(payload);
      return newSetting;
    });

    const metric = {
      id: this.data.id,
      documentId: this.data.documentID,
      machineNumber: this.data.machineNumber,
      settings: payloads
    };

    this.machineService.updateMetric(metric);
  }

  getControl(index, fieldName) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }

}
