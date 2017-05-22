import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RigService {

  rigs: Observable<any[]>;

  constructor(
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,

  ) {
    this.rigs = this.afAuth.authState
      .mergeMap(auth => this.afDb.list(`${auth.uid}/rigs`)
        .map((rigs: { [key: string]: any }) => rigs.map(rig => {
          rig.console = Object.keys(rig.console).map(key => rig.console[key])
          rig.mac = rig.$key;
          return rig;
        }))
      )
  }
}
