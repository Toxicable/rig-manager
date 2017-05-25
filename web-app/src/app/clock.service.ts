import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ClockSerice {
  private interval = new BehaviorSubject(10000);
  timer = this.interval.switchMap(interval => Observable.timer(0, interval).map(i => new Date));
  currentTime = Observable.timer(0, 500).map(i => new Date);

  updateInterval(value: number) {
    this.interval.next(value);
  }
}
