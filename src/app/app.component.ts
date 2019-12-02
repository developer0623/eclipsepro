import { Component } from '@angular/core';
import { SidenavItem } from './core/layout/sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from './core/layout/sidenav/sidenav.service';
import { AppService } from 'app/services/app.service';
import { SystemInfoService } from 'app/services/system-info.service';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(sidenavService: SidenavService,
    private appService: AppService,
    private systemInfo: SystemInfoService
  ) {

    const menu: SidenavItem[] = [];

    menu.push({
      name: 'Machines',
      routeOrFunction: '/machines',
      icon: 'dashboard',
      position: 10,
    });

    const scheduleTimeline = {
      name: 'Timeline',
      routeOrFunction: '/timeline',
      position: 10
    };

    const scheduleEditor = {
      name: 'Schedule Editor',
      routeOrFunction: '/schedule-editor',
      position: 15
    };

    const scheduleDowntimeEditor = {
      name: 'Downtime Editor',
      routeOrFunction: '/downtime-editor',
      position: 20
    };

    menu.push({
      name: 'Schedule',
      icon: 'description',
      position: 15,
      subItems: [
        scheduleTimeline,
        scheduleEditor,
        scheduleDowntimeEditor
      ]
    });

    menu.push({
      name: 'Orders',
      routeOrFunction: '/orders',
      icon: 'description',
      position: 20
    });

    const inventoryMaterials = {
      name: 'Materials',
      routeOrFunction: '/inventory/materials',
      position: 10
    };

    const inventoryCoils = {
      name: 'Coils',
      routeOrFunction: '/inventory/coils',
      position: 15
    };

    menu.push({
      name: 'Inventory',
      icon: 'description',
      position: 25,
      subItems: [
        inventoryMaterials,
        inventoryCoils
      ]
    });

    const warehouseTasks = {
      name: 'Tasks',
      routeOrFunction: '/warehouse/tasks',
      position: 10
    };

    const warehouseUsers = {
      name: 'Users',
      routeOrFunction: '/warehouse/users',
      position: 15
    };

    const warehouseSettings = {
      name: 'App Settings',
      routeOrFunction: '/warehouse/settings',
      position: 20
    };

    menu.push({
      name: 'Warehouse',
      icon: 'description',
      position: 30,
      subItems: [
        warehouseTasks,
        warehouseUsers,
        warehouseSettings
      ]
    });

    const productionSummary = {
      name: 'Production Summary',
      routeOrFunction: '/report/production-summary',
      position: 10
    };

    const downtimeExplorer = {
      name: 'Downtime Explorer',
      routeOrFunction: '/report/downtime-explorer',
      position: 15
    };

    const productionExplorer = {
      name: 'Good Production Explorer',
      routeOrFunction: '/report/production-explorer',
      position: 20
    };

    menu.push({
      name: 'Reports',
      icon: 'description',
      position: 35,
      subItems: [
        productionSummary,
        downtimeExplorer,
        productionExplorer
      ]
    });

    const agentStatus = {
      name: 'Agent Status',
      routeOrFunction: '/settings/agent-status',
      position: 50
    };

    const  andonConfiguration = {
      name: 'Andon Configuration',
      routeOrFunction: '/settings/andon-configuration',
      position: 25
    };

    const integration = {
      name: 'Integration',
      routeOrFunction: '/settings/integration',
      position: 40
    };

    const metricConfiguration = {
      name: 'Metric Configuration',
      routeOrFunction: '/settings/metric-configuration',
      position: 15
    };

    const performanceStandards = {
      name: 'Performance Standards',
      routeOrFunction: '/settings/performance-standards',
      position: 20,
      featureFlag: 'performance-standards'
    };

    const systemPreferences = {
      name: 'System Preferences',
      routeOrFunction: '/settings/system-preferences',
      position: 10
    };

    const printing = {
      name: 'Printing',
      routeOrFunction: '/settings/printing',
      position: 30,
      featureFlag: 'printing'
    };
    const licensing = {
      name: 'Licensing',
      routeOrFunction: '/settings/licensing',
      position: 35,
      featureFlag: 'experimental'
    };

    const status = {
      name: 'System Health',
      routeOrFunction: '/settings/status',
      position: 45,
      featureFlag: 'experimental',
    };

    menu.push({
      name: 'Settings',
      icon: 'settings',
      position: 45,
      subItems: [
        agentStatus,
        andonConfiguration,
        integration,
        metricConfiguration,
        performanceStandards,
        systemPreferences,
        printing,
        licensing,
        status
      ]
    });

    // Send all created Items to SidenavService
    menu.forEach(item => sidenavService.addItem(item));
  }
}
