import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromDashboard from './dashboard/effects';
import * as fromScheduler from './scheduler/effects';
import * as fromSubscriptions from './subscriptions/effects';
import * as fromSettings from './settings/effects';
import * as fromInventory from './inventory/effects';
import * as fromWarehouse from './warehouse/effects';
import * as fromReports from './reports/effects';
import * as fromProductionExplorer from './productionExplorer/effects';

import { environment } from 'environments/environment';
import { reducers } from './root.reducers';

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [storeFreeze]
    : [];

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([
          fromDashboard.Effects,
          fromSubscriptions.Effects,
          fromScheduler.Effects,
          fromSettings.Effects,
          fromInventory.Effects,
          fromWarehouse.Effects,
          fromReports.Effects,
          fromProductionExplorer.Effects
        ]),
        !environment.production ? StoreDevtoolsModule.instrument({
            name: 'NgRx Book Store App',
            logOnly: true,
        }) : [],
        StoreRouterConnectingModule
    ]
})

export class AppStoreModule { }
