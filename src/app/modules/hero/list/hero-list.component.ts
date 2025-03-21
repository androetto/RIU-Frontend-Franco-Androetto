import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: []
  })
  export class HeroListComponent  {}