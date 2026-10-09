import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ConferenceList } from './conference-list/conference-list';
import { ConferenceDetails } from './conference-details/conference-details';
import { NotFound } from './notfound/notfound';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'conferences', component: ConferenceList },
  { path: 'conferences/:id', component: ConferenceDetails },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFound },
];