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
  btcToNzd$: Observable<any>;
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
        return coins.filter(coin => coin.algo === 'Ethash').map(coin => {
          const coinsPerHour = (hashrate * 1000000) / coin.networkHashrate * 3600 / coin.blockTime * coin.blockReward
          const btcPerMonth = coin.exchangeRate * coinsPerHour * hoursPerMonth;
          coin.nzdPerMonth = btcToNzd.price * btcPerMonth;
          coin.profitPerMonth = coin.nzdPerMonth - electrictyPerMonth;
          return coin;
        })
      }
    )

  }

  currentConsole: any[];

}
