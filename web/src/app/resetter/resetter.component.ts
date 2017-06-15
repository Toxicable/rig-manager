import { AddRigComponent } from './add-rig.component';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Rig } from './../models/rig';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
@Component({
  selector: 'resetter',
  templateUrl: 'resetter.component.html'
})
export class ResetterComponent{

  rigs$: Observable<Rig[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private dialog: MdDialog
  ) { }
  ngOnInit(){
    this.rigs$ = this.afAuth.authState
      .mergeMap(user => this.afDb.list(`${user.uid}/rigs`))
  }
  add(){
    let addDialog = this.dialog.open(AddRigComponent);
  }
  remove(){

  }
  resetRig(key: number){
    this.afDb.object(`${this.afAuth.auth.currentUser.uid}/rigs/${key}/shouldRestart`).set(true);
  }
}
