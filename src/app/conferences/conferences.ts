import { Component, signal } from '@angular/core';
import { ConferenceList } from '../conference-list/conference-list';
import { ConferenceDetails } from '../conference-details/conference-details';

@Component({
  selector: 'app-conferences',
  imports: [ConferenceList, ConferenceDetails],
  templateUrl: './conferences.html',
  styleUrl: './conferences.css',
})
export class Conferences {
  
  // données de test
  conferences = signal<any>([
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
      speaker: 'Ing.Youssef Mansour',
      category: 'Cloud & Infrastructure',
      availableSeats: 5,
    }
  ]);

  selectedConference = signal<any>(null); // conférence sélectionnée

  // sélectionner une conférence
  selectConference(conf: any): void {
    this.selectedConference.set(conf);
  }

  // réserver une place
  onRegister(conf: any): void {
    if (conf.availableSeats > 0) {
      this.conferences.update((list: any[]) =>
        list.map((c: any) =>
          c.id === conf.id ? { ...c, availableSeats: c.availableSeats - 1 } : c // décrémenter les places
        )
      );
      this.selectedConference.set({ ...conf, availableSeats: conf.availableSeats - 1 }); // mise à jour de la conférence sélectionnée
    }
  }
}
