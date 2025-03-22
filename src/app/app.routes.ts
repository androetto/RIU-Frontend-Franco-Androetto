import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/hero/hero.routes').then((m) => m.HERO_ROUTES),
  }
];
