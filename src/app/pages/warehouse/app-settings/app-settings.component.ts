import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { WarehouseService } from 'app/services/warehouse.service';
import { LocationCategory } from 'app/models/dto';
import { AddReasonModalComponent } from './components/add-reason-modal/add-reason-modal.component';
import { AddLocationModalComponent } from './components/add-location-modal/add-location-modal.component';
import * as _ from 'lodash';

const table = {
  'NonpreferredReasons': 'Nonpreferred Reasons',
  'OverrideReasons': 'Override Reasons',
  'UnattainableReasons': 'Cannot Complete Reasons',
};

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppSettingsComponent implements OnInit {
  warningTimes = [{value: 10, name: '10 mins'}, {value: 20, name: '20 mins'}, {value: 30, name: '30 mins'}];
  reasons = [];
  locations = [];
  selectedTime = 10;

  constructor(private wareHouseService: WarehouseService, public dialog: MatDialog) {
    this.wareHouseService.reasonCodes$.subscribe(codes => {
      this.reasons = [];
      const reasonsvm  = _(codes).groupBy(c => c.codeSet).value();
      _.forEach(reasonsvm, (value, key) => {
        const item = { key, codeSetName: table[key] || key, content: value };
        this.reasons.push(item);
      });
    });

    this.wareHouseService.location$.subscribe(locations => {
      const init = [
        { title: 'MACHINE', items: [], doNotEdit: true, category: LocationCategory[LocationCategory.Machine]},
        { title: 'WAREHOUSE', items: [], category: LocationCategory[LocationCategory.Warehouse] },
        { title: 'STAGING BAY', items: [], category: LocationCategory[LocationCategory.StagingBay]},
        { title: 'TRUCK', items: [], category: LocationCategory[LocationCategory.Truck] },
        { title: 'LOADING DOCK', items: [], category: LocationCategory[LocationCategory.LoadingDock] },
        { title: 'BIN', items: [], category: LocationCategory[LocationCategory.Bin] }
      ];
      locations.forEach(location => {
        // Using the enum's numeric value as the index into the array.
        const listitem = init[LocationCategory[location.category]];
        if (listitem) {
            const i = listitem.items.findIndex(l => l.id === location.id);
            if (i >= 0) {
                listitem.items[i] = location;
            } else {
                listitem.items.push(location);
            }
        } else {
            // a new location category. Need to add it to the init. Probably use the LocationCategory value as the title.
        }
      });
      this.locations = init;
    });
  }

  ngOnInit() {
  }

  removeReson(reason) {
    this.wareHouseService.deleteReason(reason.id);
  }

  gotoAddReason(key: string) {
    const dialogRef = this.dialog.open(AddReasonModalComponent, {
      panelClass: ['reason-dialog', 'custom-dialog'],
      data: {codeSet: key, reason: ''}
    });

    dialogRef.afterClosed().subscribe(reason => {
      if (reason) {
        const item = { codeSet: key, reason };
        this.wareHouseService.addReason(item);
      }
    });
  }

  gotoAddLocation(locationArray) {
    const dialogRef = this.dialog.open(AddLocationModalComponent, {
      panelClass: ['location-dialog', 'custom-dialog'],
      data: {category: locationArray.category, name: ''}
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        const item = { category: locationArray.category, name };
        this.wareHouseService.addLocation(item);
      }
    });

  }

}
