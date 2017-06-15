import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MdDialog } from "@angular/material";
import { SettingsComponent } from "app/settings/settings.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private dialog: MdDialog,
  ) { }

  openSettings(){
    this.dialog.open(SettingsComponent);
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['login'])
  }
}
