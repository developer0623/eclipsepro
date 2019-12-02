import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: 'app/pages/custom-pages/login/login.module#LoginModule',
  // },
  // {
  //   path: 'register',
  //   loadChildren: 'app/pages/custom-pages/register/register.module#RegisterModule',
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: 'app/pages/custom-pages/forgot-password/forgot-password.module#ForgotPasswordModule',
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'machines',
        pathMatch: 'full'
      },
      {
        path: 'machines',
        loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'orders',
        loadChildren: 'app/pages/orders/orders.module#OrdersModule',
      },
      {
        path: 'inventory/materials',
        loadChildren: 'app/pages/inventory/materials/materials.module#MaterialsModule',
      },
      {
        path: 'inventory/coils',
        loadChildren: 'app/pages/inventory/coils/coils.module#CoilsModule',
      },
      {
        path: 'schedule-editor',
        loadChildren: 'app/pages/schedule/schedule-editor/schedule-editor.module#ScheduleEditorModule',
      },
      {
        path: 'timeline',
        loadChildren: 'app/pages/schedule/timeline/timeline.module#TimelineModule',
      },
      {
        path: 'downtime-editor',
        loadChildren: 'app/pages/schedule/downtime-editor/downtime-editor.module#DowntimeEditorModule',
      },
      {
        path: 'settings/agent-status',
        loadChildren: 'app/pages/settings/agent-status/agent-status.module#AgentStatusModule',
      },
      {
        path: 'settings/andon-configuration',
        loadChildren: 'app/pages/settings/andon-configuration/andon-configuration.module#AndonConfigurationModule',
      },
      {
        path: 'settings/integration',
        loadChildren: 'app/pages/settings/integration/integration.module#IntegrationModule',
      },
      {
        path: 'settings/metric-configuration',
        loadChildren: 'app/pages/settings/metric-configuration/metric-configuration.module#MetricConfigurationModule',
      },
      {
        path: 'settings/performance-standards',
        loadChildren: 'app/pages/settings/performance-standards/performance-standards.module#PerformanceStandardsModule',
      },
      {
        path: 'settings/system-preferences',
        loadChildren: 'app/pages/settings/system-preferences/system-preferences.module#SystemPreferencesModule',
      },
      {
        path: 'settings/experiments',
        loadChildren: 'app/pages/settings/experiments/experiments.module#ExperimentsModule',
      },
      {
        path: 'settings/licensing',
        loadChildren: 'app/pages/settings/licensing/licensing.module#LicensingModule',
      },
      {
        path: 'settings/printing',
        loadChildren: 'app/pages/settings/printing/printing.module#PrintingModule',
      },
      {
        path: 'settings/status',
        loadChildren: 'app/pages/settings/status/status.module#StatusModule',
      },
      {
        path: 'settings/update',
        loadChildren: 'app/pages/settings/update/update.module#UpdateModule',
      },
      {
        path: 'warehouse/tasks',
        loadChildren: 'app/pages/warehouse/tasks/tasks.module#TasksModule',
      },
      {
        path: 'warehouse/users',
        loadChildren: 'app/pages/warehouse/users/users.module#UsersModule',
      },
      {
        path: 'warehouse/settings',
        loadChildren: 'app/pages/warehouse/app-settings/app-settings.module#AppSettingsModule',
      },
      {
        path: 'report/production-summary',
        loadChildren: 'app/pages/reports/production-summary/production-summary.module#ProductionSummaryModule',
      },
      {
        path: 'report/downtime-explorer',
        loadChildren: 'app/pages/reports/downtime-explorer/downtime-explorer.module#DowntimeExplorerModule',
      },
      {
        path: 'report/production-explorer',
        loadChildren: 'app/pages/reports/production-explorer/production-explorer.module#ProductionExplorerModule',
      },
      // {
      //   path: 'apps/inbox',
      //   loadChildren: 'app/pages/apps/inbox/inbox.module#InboxModule',
      // },
      // {
      //   path: 'apps/calendar',
      //   loadChildren: 'app/pages/apps/calendar/calendar.module#CalendarAppModule',
      // },
      // {
      //   path: 'apps/chat',
      //   loadChildren: 'app/pages/apps/chat/chat.module#ChatModule',
      // },
      // {
      //   path: 'components',
      //   loadChildren: 'app/pages/components/components.module#ComponentsModule',
      // },
      // {
      //   path: 'forms/form-elements',
      //   loadChildren: 'app/pages/forms/form-elements/form-elements.module#FormElementsModule',
      // },
      // {
      //   path: 'forms/form-wizard',
      //   loadChildren: 'app/pages/forms/form-wizard/form-wizard.module#FormWizardModule',
      // },
      // {
      //   path: 'icons',
      //   loadChildren: 'app/pages/icons/icons.module#IconsModule',
      // },
      // {
      //   path: 'level1/level2/level3/level4/level5',
      //   loadChildren: 'app/pages/level5/level5.module#Level5Module',
      // },
      // {
      //   path: 'maps/google-maps',
      //   loadChildren: 'app/pages/maps/google-maps/google-maps.module#GoogleMapsModule',
      // },
      // {
      //   path: 'tables/simple-table',
      //   loadChildren: 'app/pages/tables/simple-table/simple-table.module#SimpleTableModule',
      // },
      // {
      //   path: 'tables/all-in-one-table',
      //   loadChildren: 'app/pages/tables/all-in-one-table/all-in-one-table.module#AllInOneTableModule',
      // },
      // {
      //   path: 'drag-and-drop',
      //   loadChildren: 'app/pages/drag-and-drop/drag-and-drop.module#DragAndDropModule'
      // },
      // {
      //   path: 'editor',
      //   loadChildren: 'app/pages/editor/editor.module#EditorModule',
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
