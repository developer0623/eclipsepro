import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({
  name: 'taskActiveAgo',
  pure: false
})
export class TaskActiveAgoPipe implements PipeTransform, OnDestroy {

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
    const diffTime = Math.abs(momentConstructor().diff(oldMoment, 'seconds'));
    const secondRes = 5; // todo: parameterize

    if (!diffTime || diffTime <= 0) {
      return '';
    }

    let remain = diffTime;
    const months = Math.floor(remain / 2592000);
    remain -= months * 2592000;
    const days = Math.floor(remain / 86400);
    remain -= days * 86400;
    const hours = Math.floor(remain / 3600) % 24;
    remain -= hours * 3600;
    const minutes = Math.floor(remain / 60) % 60;
    remain -= minutes * 60;
    const seconds = Math.floor(remain % 60 / secondRes) * secondRes; // rem % 60/secondRes*secondRes;

    if (months > 0) {
      return `${months}<span class='time-sign'>MON</span>`;
    }
    if (days > 0) {
      return `${days}<span class='time-sign'>D&nbsp;</span>${hours}<span class='time-sign'>H</span>`;
    }
    if (hours > 0) {
      return `${hours}<span class='time-sign'>H&nbsp;</span>${minutes}<span class='time-sign'>M</span>`;
    }
    if (minutes > 0) {
      return `${minutes}<span class='time-sign'>M&nbsp;</span>${seconds}<span class='time-sign'>S</span>`;
    }
    if (seconds >= 0) {
      return `${seconds}<span class='time-sign'>S</span>`;
    }
    return '';
  }


  private createTimer() {
    if (this.currentTimer) {
      return;
    }
    const momentInstance = momentConstructor(this.lastValue);

    const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
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
