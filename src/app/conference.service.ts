import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  // liste des conférences
  conferences = signal<any[]>([
    {
      id: 1,
      name: 'Angular Innovations',
      place: 'Tunis',
      date: '2026-10-15',
      speaker: 'Ing. Sarra Ben Ali',
      category: 'Architecture Web',
      availableSeats: 10,
    },
    {
      id: 2,
      name: 'AI & Data Science',
      place: 'Sousse',
      date: '2026-10-22',
      speaker: 'Ing. Karim Trabelsi',
      category: 'Intelligence Artificielle',
      availableSeats: 0,
    },
    {
      id: 3,
      name: 'Cloud & DevOps',
      place: 'Sfax',
      date: '2026-11-05',
      speaker: 'Ing. Youssef Mansour',
      category: 'Cloud & Infrastructure',
      availableSeats: 5,
    },
  ]);

  // récupérer une conférence par son id
  getConferenceById(id: number): any {
    return this.conferences().find((c) => c.id == id);
  }

  // réserver une place
  reserveSeat(id: number): void {
    this.conferences.update((list) =>
      list.map((c) =>
        c.id == id && c.availableSeats > 0
          ? { ...c, availableSeats: c.availableSeats - 1 }
          : c
      )
    );
  }
}
