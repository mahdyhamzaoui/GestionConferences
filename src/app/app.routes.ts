import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'conferences',
    loadChildren: () =>
      import('./conference.routes').then((m) => m.conferenceRoutes),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./notfound/notfound').then((m) => m.NotFound),
  },
];
