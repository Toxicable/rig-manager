import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'form-input',
  templateUrl: 'form-input.component.html'
})
export class FormInputComponent {
  @Input() control: FormControl;
  @Input() placeholder: string;

  ngOnInit() {
  }

}
