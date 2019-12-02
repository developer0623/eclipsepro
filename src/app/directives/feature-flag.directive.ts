import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { FeatureFlagService } from 'app/services/feature-flag.service';

@Directive({
  selector: '[appFeatureFlag]'
})
export class FeatureFlagDirective implements OnInit {
  @Input('appFeatureFlag') appFeatureFlag: string;
  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureFlagService: FeatureFlagService) { }

  ngOnInit() {
    this.featureFlagService.getFeatureFlags().subscribe((flags) => {
      if (flags[this.appFeatureFlag]) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
