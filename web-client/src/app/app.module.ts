import { HttpProxyService } from './proxy.service';
import { ClockSerice } from './clock.service';
import { PoolMonitoringService } from './pool-monitoring/pool-monitoring.service';
import { PoolMonitoringComponent } from './pool-monitoring/pool-monitoring.component';
import { DashboardComponent } from './dashboard.component';
import { environment } from './../environments/environment';
import { appRouting } from './app.routing';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { LoginComponent } from "app/auth/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdInputModule, MdSelectModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/empty';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PoolMonitoringComponent,
  ],
  imports: [
    appRouting,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
    MdSelectModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PoolMonitoringService,
    ClockSerice,
    HttpProxyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
