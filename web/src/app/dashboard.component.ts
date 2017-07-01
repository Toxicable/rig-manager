import { Ad } from './models/localbitcoin-ad';
import { Coin } from './models/whattomine-coin';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RigService } from './rig.service';
import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'rm-dashboard',
  templateUrl: 'dashboard.component.html',
  animations: [
    trigger('flashChange', [
      transition('* => *', [
        style({ 'background-color': 'green' }),
        animate(2500, style({ 'background-color': 'white' }))
      ])
    ])
  ]
})
export class DashboardComponent {

  trackByName(idx, item){
    return item['tag'];
  }

  coins$: Observable<Coin[]>;
  btcToNzd$: Observable<Ad>;
  ethProfitablity$: Observable<any[]>;

  powerControl = new FormControl('3150');
  hashrateControl = new FormControl('600');
  powerCostControl = new FormControl('0.19');
  constructor(
    public rigService: RigService,
    private afDb: AngularFireDatabase,
  ) {
    this.btcToNzd$ = afDb.list('external-data/localbitcoins')
      .map((coinAds: Ad[]) => coinAds.sort((a, b) => +b.price - +a.price )[0]);

    this.coins$ = afDb.list('external-data/whattomine')
      .map(coins => coins.sort((a, b) => b.profitablity - a.profitablity ));

    const hoursPerMonth = 730;

    this.ethProfitablity$ = Observable.combineLatest(
      this.btcToNzd$.first(),
      this.coins$,
      this.powerControl.valueChanges.startWith(3150),
      this.powerCostControl.valueChanges.startWith(0.19),
      this.hashrateControl.valueChanges.startWith(600),
      (btcToNzd, coins, wattage, powerCost, hashrate) => {
        const electrictyPerMonth = +wattage * hoursPerMonth * +powerCost / 1000;
        return coins.filter(coin => coin.algo === 'Ethash').map(coin => {
          const coinsPerHour = (hashrate * 1000000) / +coin.networkHashrate * 3600 / +coin.blockTime * coin.blockReward
          const btcPerMonth = coin.exchangeRate * coinsPerHour * hoursPerMonth;
          const nzdPerMonth = +btcToNzd.price * btcPerMonth;
          coin.profitPerMonth = nzdPerMonth - electrictyPerMonth;
          return coin;

        })
      }
    )
  }

}
