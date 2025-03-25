import { Directive, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UppercaseDirective),
      multi: true
    }
  ]
})
export class UppercaseDirective {
  constructor() {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const uppercasedValue = input.value.toUpperCase();
    input.value = uppercasedValue;
    this.onChange(uppercasedValue); 
  }

  writeValue(value: any): void {
    if (value) {
      const input = document.querySelector('[appUppercase]') as HTMLInputElement;
      if (input) {
        input.value = value.toUpperCase();
      }
    }
  }

  onChange = (_: any) => {};
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
