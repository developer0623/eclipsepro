import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ScrollingModule } from '@angular/cdk/scrolling';

import 'hammerjs'; // Needed for Touch functionality of Material Components
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStoreModule } from 'app/store/store.module';
import { PipesModule } from 'app/pipes/pipes.module';

import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import { MachineProvider } from './providers/machine.provider';
import { MachineService } from './services/machine.service';
import { ClientDataHubService } from './services/clientdatahub.service';
import { OrdersService } from './services/orders.service';
import { InventoryService } from './services/inventory.service';
import { ScheduleService } from './services/schedule.service';
import { AppService } from './services/app.service';
import { DowntimeDataService } from './services/downtime-data.service';
import { EclipseProHelperService } from './services/eclipse-pro-helper.service';
import { FeatureFlagService } from './services/feature-flag.service';
import { SettingsService } from './services/settings.service';
import { SidenavService } from './core/layout/sidenav/sidenav.service';
import { WarehouseService } from './services/warehouse.service';
import { SubscriptionsService } from './services/subscriptions.service';
import { ReportsService } from './services/reports.service';
import { SystemInfoService } from './services/system-info.service';
import { ProductionExplorerService } from './services/production-explorer.service';


@NgModule({
  imports: [
    // Angular Core Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    AppStoreModule,

    // Fury Core Modules
    CoreModule,
    AppRoutingModule,
    PipesModule,

    // Register a Service Worker (optional)
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    MachineProvider,
    MachineService,
    ClientDataHubService,
    OrdersService,
    InventoryService,
    ScheduleService,
    AppService,
    DowntimeDataService,
    EclipseProHelperService,
    FeatureFlagService,
    SettingsService,
    SubscriptionsService,
    SidenavService,
    WarehouseService,
    ReportsService,
    SystemInfoService,
    ProductionExplorerService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class AppModule {
  // This is a singleton worker service that runs in the background, nobody needs
  // nor should be allowed to get a reference to it. This allows it's creation to
  // participate in dependency injection.
  constructor(private _: ClientDataHubService) { }
}
