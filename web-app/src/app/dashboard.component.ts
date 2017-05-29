import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RigService } from './rig.service';
import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
@Component({
  selector: 'rm-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  coins$: Observable<any[]>;
  btcToNzd$: Observable<any[]>;
  ethProfitablity$: Observable<any[]>;

  powerControl = new FormControl('3150');
  hashrateControl = new FormControl('600');
  powerCostControl = new FormControl('0.19');
  constructor(
    public rigService: RigService,
    private afDb: AngularFireDatabase,
  ) {
    this.btcToNzd$ = afDb.list('external-data/localbitcoins')
      .map(coinAds => coinAds.sort((a, b) => a - b)[0])

    this.coins$ = afDb.list('external-data/whattomine')
      .map(coins => coins.sort((a, b) => b.profitablity - a.profitablity )),

    this.ethProfitablity$ = Observable.combineLatest(
      this.btcToNzd$,
      this.coins$,
      this.powerControl.valueChanges.startWith(3150),
      this.powerCostControl.valueChanges.startWith(0.19),
      this.hashrateControl.valueChanges.startWith(600),
      (btcToNzd, coins, wattage, powerCost, hashrate) => {
        const hoursPerMonth = 730;
        const daysPerMonth = hoursPerMonth / 24;
        const electrictyPerMonth = +wattage * hoursPerMonth * +powerCost / 1000;
        return coins.filter(coin => coin.tag === "ETH" || coin.tag === "ETC").map(coin => {
          const coinsPerDay = (coin.blockReward * +hashrate * 1000 / coin.difficulty) * (5.662224e15 / Math.pow(2, 48));
          const btcPerMonth = coin.exchangeRate * coinsPerDay * 30.4;
          coin.nzdPerMonth = +btcToNzd * btcPerMonth;
          coin.profitPerMonth = coin.nzdPerMonth.price - electrictyPerMonth;
          return coin;
        })
      }
    )

  }

  currentConsole: any[];

}
