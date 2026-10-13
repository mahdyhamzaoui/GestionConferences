import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'conferences',
    loadChildren: () =>
      import('./features/conferences/conference.routes').then((m) => m.conferenceRoutes),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound').then((m) => m.NotFound),
  },
];
