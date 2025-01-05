import {Component, Input, Self} from '@angular/core';
import {FormControl, NgControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() type = 'text';
  @Input() label = '';
  isControlTouched = false;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  ngOnInit() {
    this.control.statusChanges.subscribe(() => {
      this.isControlTouched = this.control.dirty || this.control.touched;
    });
  }

}
