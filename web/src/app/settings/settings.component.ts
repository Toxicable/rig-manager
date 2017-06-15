import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'selecting',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent{
  constructor(
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(){

  }

}
