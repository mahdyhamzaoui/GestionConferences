import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Conferences } from './conferences/conferences';
import { NotFound } from './notfound/notfound';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'conferences', component: Conferences },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFound },
];