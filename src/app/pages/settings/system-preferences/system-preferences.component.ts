import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SettingsService } from 'app/services/settings.service';
import { UnitsService } from 'app/services/units.service';
import { FeatureFlagService } from 'app/services/feature-flag.service';
import {
  ILanguage,
  ISystemPreferences
} from 'app/models/dto';

@Component({
  selector: 'app-system-preferences',
  templateUrl: './system-preferences.component.html',
  styleUrls: ['./system-preferences.component.scss']
})
export class SystemPreferencesComponent implements OnInit {
  languages: ILanguage[] = [];
  selectedLanguage: ILanguage;
  systemPreferences: ISystemPreferences;
  units = [];
  selectedUnit = {};
  experimentalFeatures = false;

  constructor(private settingsService: SettingsService,
    private unitsService: UnitsService,
    private featureFlagService: FeatureFlagService
  ) {
    combineLatest([this.settingsService.languages$, this.settingsService.preferences$]).subscribe(results => {
      this.systemPreferences = results[1];
      this.languages = results[0];
      this.selectedLanguage = this.languages.find(lang => lang.code === this.systemPreferences.systemLanguage);
      this.units = this.unitsService.getBaseUnits();
      this.selectedUnit = this.units.find(unit => unit.key === this.systemPreferences.inchesUnit);
    });

    this.featureFlagService.getFeatureFlags().subscribe(flags => {
      this.experimentalFeatures = flags['experimental'];
    });
  }

  ngOnInit() {
  }

  changeLanguage(lang) {

  }

  changeUnit(unit) {

  }

  setExperimentalFeatures() {
    this.featureFlagService.setFeature('experimental', this.experimentalFeatures);
  }

  setRedirectFromLocalHost() {

  }

}
