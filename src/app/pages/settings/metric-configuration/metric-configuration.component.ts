import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { MachineService } from 'app/services/machine.service';
import { UnitsService } from 'app/services/units.service';
import { IMachine, IMachineMetricSettings, IMetricDefinition  } from 'app/models/dto';
@Component({
  selector: 'app-metric-configuration',
  templateUrl: './metric-configuration.component.html',
  styleUrls: ['./metric-configuration.component.scss']
})
export class MetricConfigurationComponent implements OnInit {
  machines$: Observable<IMachine[]>;
  metricDefinitions$: Observable<IMetricDefinition[]>;
  metricSettings$: Observable<IMachineMetricSettings[]>;
  machines: any[] = [];

  constructor(private machineService: MachineService, private unitService: UnitsService) {
    this.machines$ = this.machineService.getOriginMachines();
    this.metricDefinitions$ = this.machineService.getMetricDefinition();
    this.metricSettings$ = this.machineService.getMachineMetricSettings();
    combineLatest([this.metricDefinitions$, this.metricSettings$, this.machines$]).subscribe(results => {
      if (results[0].length > 0 && results[1].length > 0 && results[2].length > 0) {
        const metricDefinitions = results[0];
        const metricSettings = results[1];
        const machines = results[2];
        const metricSettingsVm = metricSettings.map(ms => {
          const settings = ms.settings.map(setting => {
            const definition = metricDefinitions.find(md => md.metricName === setting.metricName);
            return {
              ...setting,
              definition,
              maxValueUser : this.getUserValue(setting.maxValue, definition.primaryUnits),
              minValueUser : this.getUserValue(setting.minValue, definition.primaryUnits),
              okRangeStartUser : this.getUserValue(setting.okRangeStart, definition.primaryUnits),
              okRangeEndUser : this.getUserValue(setting.okRangeEnd, definition.primaryUnits),
              targetValueUser : this.getUserValue(setting.targetValue, definition.primaryUnits)
            };
          });

          return { ...ms, settings };
        });

        this.machines = machines.map(machine => {
          const metricSet = metricSettingsVm.find(ms => ms.machineNumber.toString() === machine.id.toString());
          return { ...machine, ...metricSet};
        });
      }
    });
  }

  ngOnInit() {
  }

  getUserValue(baseValue: number, baseUnit: string): number {
    if (baseUnit === '%') {
      return baseValue * 100; // use unitsService for rounding?
    }
    return this.unitService.convertUnits(baseValue, baseUnit, 3);
  }

}
