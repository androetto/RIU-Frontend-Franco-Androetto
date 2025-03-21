import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: []
  })
  export class HeroComponent  {}