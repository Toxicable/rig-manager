import { HttpProxyService } from './../proxy.service';
import { Http } from '@angular/http';
import { ClockSerice } from './../clock.service';
import { PoolMonitoringConfig } from './pool-monitoring-config';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PoolMonitoringService {

  poolConfigs: Observable<PoolMonitoringConfig[]>;
  poolData: Observable<any>;

  constructor(
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private clock: ClockSerice,
    private proxyHttp: HttpProxyService,

  ) {
    this.poolConfigs = this.afAuth.authState.mergeMap(auth => this.afDb.list(`${auth.uid}/pool-monitoring`))
    this.poolData = this.clock.timer
      .mergeMap(time =>
        this.poolConfigs.mergeMap(configs =>
          Observable.forkJoin(
            configs.map(config => {
              return this.getData(config.url).map(data => {
                data.name = config.name;
                return data;
              })
            })
          )
        )
      )
  }

  createMonitor(config: PoolMonitoringConfig) {
    this.afDb.list(`${this.afAuth.auth.currentUser.uid}/pool-monitoring`).push(config);
  }
  getData(url: string) {
    return this.proxyHttp.get(url)
      .catch(error => Observable.empty())
  }

}
