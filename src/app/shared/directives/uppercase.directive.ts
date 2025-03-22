import { Directive, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appUppercase]',
})
export class UppercaseDirective {
  constructor() {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}
