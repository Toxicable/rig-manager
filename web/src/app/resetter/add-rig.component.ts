import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Rig } from './../models/rig';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { MdDialog } from '@angular/material'

@Component({
  selector: 'add-resetter',
  templateUrl: 'add-rig.component.html'
})
export class AddRigComponent{

  form: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private fb: FormBuilder,
  ) { }
  ngOnInit(){
    this.form = this.fb.group({
      'name': '',
      'ipAddress': '',
      'port': ''
    })
  }



  submit(){
    let rig = this.form.value;
    rig.shouldRestart = false;
    this.afDb.list(`${this.afAuth.auth.currentUser.uid}/rigs`).push(rig);
  }
}
