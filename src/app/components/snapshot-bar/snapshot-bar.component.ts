import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snapshot-bar',
  templateUrl: './snapshot-bar.component.html',
  styleUrls: ['./snapshot-bar.component.scss']
})
export class SnapshotBarComponent implements OnInit, OnDestroy {
  @Input('running') running: any;
  @Input('exempt') exempt: any;
  @Input('changeover') changeover: any;
  @Input('downtime') downtime: any;
  @Input('breakdown') breakdown: any;
  @Input('offline') offline: any;
  @Input('isTimeline') isTimeline = false;

  private _s: Subscription;
  mediaState = '';

  constructor(private mediaObserver: MediaObserver, private sanitizer: DomSanitizer) { }

  ngOnInit () {
    this._s = this.mediaObserver.media$.subscribe((m: MediaChange) => {
      this.mediaState = m.mqAlias;
    });
  }

  ngOnDestroy() {
    if (this._s) {
      this._s.unsubscribe();
    }
  }

  total () {
    const result = (this.running || 0) + (this.exempt || 0) + (this.changeover || 0) +
      (this.downtime || 0) + (this.breakdown || 0) + (this.offline || 0);
    return result;
  }

  compareMedia(media) {
    return media === this.mediaState;
  }

  getStyle(prop) {
    return {
      flexBais: `${prop * 100 / this.total()}%`,
      width: `${prop * 100 / this.total()}%`
    };

  }

}
