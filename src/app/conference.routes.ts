import { Routes } from '@angular/router';

export const conferenceRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./conference-list/conference-list').then((m) => m.ConferenceList),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./conference-details/conference-details').then(
        (m) => m.ConferenceDetails
      ),
  },
];
