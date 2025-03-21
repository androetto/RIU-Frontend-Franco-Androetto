import { Routes } from '@angular/router';
import { HeroListComponent } from './list/hero-list.component';
import { HeroComponent } from './crud/hero.component';

export default [
  {
    path: '',
    component: HeroListComponent
  },
  {
    path: 'new',
    component: HeroComponent
  },
  {
    path: 'update/:id',
    component: HeroComponent
  },
  {
    path: 'delete/:id',
    component: HeroComponent
  },
  {
    path: 'view/:id',
    component: HeroComponent
  }
] as Routes;
