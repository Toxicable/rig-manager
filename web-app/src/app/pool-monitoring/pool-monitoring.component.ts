import { ClockSerice } from './../clock.service';
import { PoolMonitoringService } from './pool-monitoring.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
@Component({
  selector: 'rm-pool-monitoring',
  templateUrl: 'pool-monitoring.component.html'
})
export class PoolMonitoringComponent {

  newPoolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public poolMonitoring: PoolMonitoringService,
    public clock: ClockSerice,
  ) { }

  ngOnInit(){
    this.newPoolForm = this.fb.group({
      name: '',
      url: '',
    })
  }
}
