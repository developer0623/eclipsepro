import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({
  name: 'taskTimeAgo',
  pure: false
})
export class TaskTimeAgoPipe implements PipeTransform, OnDestroy {

  private currentTimer: number;

  private lastTime: Number;
  private lastValue: Date | moment.Moment;
  private lastText: string;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  transform(value: Date | moment.Moment): string {
    if (this.hasChanged(value)) {
      this.lastTime = this.getTime(value);
      this.lastValue = value;
      this.removeTimer();
      this.createTimer();
      this.lastText = this.makeTrTime(value);
    } else {
      this.createTimer();
    }

    return this.lastText;
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private makeTrTime(oldDate) {
    const oldMoment = momentConstructor(oldDate);
    const diffTime = Math.abs(momentConstructor().diff(oldMoment, 'minutes'));
    const secondRes = 5; // todo: parameterize

    if (!diffTime || diffTime <= 0) {
      return '';
    }

    if (diffTime >= 0) {
      if (diffTime < 10) {
        return `<span class='red-color'>${diffTime}<span class='time-sign'>M</span></span>`;
      }
      if (diffTime < 60 ) {
        return `<span class='normal-color'>${diffTime}<span class='time-sign'>M</span></span>`;
      }
      if (diffTime < 1440 ){
        const hours = Math.floor(diffTime / 60);
        const minutes = diffTime % 60;
        return `<span class='normal-color'>${hours}<span class='time-sign'>H</span> ${minutes}<span class='time-sign'>M</span></span>`;
      }
      if (diffTime < 43200) {
          const days = Math.floor(diffTime / 1440) + 1;
          return `<span class='normal-color'>${days}<span class='time-sign'>D</span></span>`;
      }
      const months = Math.floor(diffTime / 43200) + 1;
      return `<span class='normal-color'>${months}<span class='time-sign'>MON</span></span>`;
    } else {
      const newDiff = Math.abs(diffTime);
     if (diffTime >= -60 ){
       return `<span class='red-color'><span class='late-sign'>late</span>${newDiff}<span class='time-sign'>M</span></span>`;
     }
     if (diffTime >= -1440 ) {
      const hours = Math.floor(newDiff / 60);
      const minutes = newDiff % 60;
      return `<span class='red-color'>
                <span class='late-sign'>late</span>${hours}<span class='time-sign'>H</span> ${minutes}<span class='time-sign'>M</span>
              </span>`;
     }
     if (diffTime >= -43200) {
      const days = Math.floor(newDiff / 1440) + 1;
      return `<span class='red-color'><span class='late-sign'>late</span>${days}<span class='time-sign'>D</span></span>`;
     }
     const months = Math.floor(newDiff / 43200) + 1;
     return `<span class='red-color'><span class='late-sign'>late</span>${months}<span class='time-sign'>MON</span></span>`;
    }
  }


  private createTimer() {
    if (this.currentTimer) {
      return;
    }
    const momentInstance = momentConstructor(this.lastValue);

    const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 5000;
    this.currentTimer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.lastText = this.makeTrTime(this.lastValue);
          this.currentTimer = null;
          this.ngZone.run(() => this.cdRef.markForCheck());
        }, timeToUpdate);
      }
    });
  }


  private removeTimer() {
    if (this.currentTimer) {
      window.clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }

  private getSecondsUntilUpdate(momentInstance: moment.Moment) {
    const howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
    if (howOld < 60) {
      return 1;
    } else if (howOld < 1440) {
      return 60;
    } else {
      return 1440;
    }
  }

  private hasChanged(value: Date | moment.Moment) {
    return this.getTime(value) !== this.lastTime;
  }

  private getTime(value: Date | moment.Moment) {
    if (moment.isDate(value)) {
      return value.getTime();
    } else if (moment.isMoment(value)) {
      return value.valueOf();
    } else {
      return momentConstructor(value).valueOf();
    }
  }

}
