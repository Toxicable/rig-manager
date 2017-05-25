import { RigService } from './rig.service';
import { Component } from '@angular/core';
@Component({
  selector: 'rm-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  constructor(
    public rigService: RigService,
  ) { }

  currentConsole: any[];

}
