import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conference } from '../models/conference';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/conferences';

  get(): Observable<Conference[]> {
    return this.http.get<Conference[]>(this.apiUrl);
  }

  getById(id: number): Observable<Conference> {
    return this.http.get<Conference>(`${this.apiUrl}/${id}`);
  }

  add(conference: Conference): Observable<Conference> {
    return this.http.post<Conference>(this.apiUrl, conference);
  }

  update(conference: Conference): Observable<Conference> {
    return this.http.put<Conference>(`${this.apiUrl}/${conference.id}`, conference);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}