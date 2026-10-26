import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConferenceService } from '../services/conference.service';
import { Conference } from '../models/conference';

@Component({
  selector: 'app-conference-list',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList implements OnInit {
  private conferenceService = inject(ConferenceService);
  private fb = inject(FormBuilder);

  conferences = signal<Conference[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  searchTerm = signal<string>('');
  selectedCategory = signal<string>('all');

  showModal = signal<boolean>(false);
  modalMode = signal<'add' | 'edit'>('add');

  conferenceForm = this.fb.group({
    id: [null as number | null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['Architecture Web', [Validators.required]],
    date: [new Date().toISOString().substring(0, 10), [Validators.required]],
    place: ['', [Validators.required]],
    speaker: ['', [Validators.required]],
    availableSeats: [20, [Validators.required, Validators.min(0)]],
  });

  showDeleteModal = signal<boolean>(false);
  conferenceToDelete = signal<Conference | null>(null);

  categories = [
    'Architecture Web',
    'Intelligence Artificielle',
    'Cloud & Infrastructure',
    'Cybersécurité',
    'Mobile & Cross-Platform',
    'DevOps & CI/CD',
  ];

  filteredConferences = computed(() => {
    const list = this.conferences();
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.selectedCategory();

    return list.filter((conf) => {
      const matchesCategory = cat === 'all' || conf.category === cat;
      const matchesSearch =
        !term ||
        conf.name.toLowerCase().includes(term) ||
        conf.speaker.toLowerCase().includes(term) ||
        conf.place.toLowerCase().includes(term) ||
        conf.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.loadConferences();
  }

  loadConferences(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.conferenceService.get().subscribe({
      next: (data) => {
        this.conferences.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set(
          'Impossible de joindre le serveur json-server. Assurez-vous de lancer : npm run server'
        );
      },
    });
  }

  openAddModal(): void {
    this.modalMode.set('add');
    this.conferenceForm.reset({
      id: null,
      name: '',
      category: 'Architecture Web',
      date: new Date().toISOString().substring(0, 10),
      place: '',
      speaker: '',
      availableSeats: 20,
    });
    this.showModal.set(true);
  }

  openEditModal(conf: Conference, event: Event): void {
    event.stopPropagation();
    this.modalMode.set('edit');
    this.conferenceForm.patchValue({
      id: conf.id !== undefined ? Number(conf.id) : null,
      name: conf.name,
      category: conf.category,
      date: conf.date,
      place: conf.place,
      speaker: conf.speaker,
      availableSeats: conf.availableSeats,
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  saveConference(): void {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }

    const formValue = this.conferenceForm.getRawValue();
    const confData: Conference = {
      name: formValue.name!,
      category: formValue.category!,
      date: formValue.date!,
      place: formValue.place!,
      speaker: formValue.speaker!,
      availableSeats: Number(formValue.availableSeats),
    };

    if (this.modalMode() === 'add') {
      const maxId = this.conferences().reduce(
        (max, c) => Math.max(max, c.id || 0),
        0
      );
      confData.id = maxId + 1;

      this.conferenceService.add(confData).subscribe({
        next: () => {
          this.loadConferences();
          this.closeModal();
          this.showSuccess('Conférence ajoutée avec succès !');
        },
        error: () => {
          this.errorMessage.set("Erreur lors de l'ajout de la conférence.");
        },
      });
    } else {
      confData.id = Number(formValue.id);

      this.conferenceService.update(confData).subscribe({
        next: () => {
          this.loadConferences();
          this.closeModal();
          this.showSuccess('Conférence mise à jour avec succès !');
        },
        error: () => {
          this.errorMessage.set('Erreur lors de la mise à jour de la conférence.');
        },
      });
    }
  }

  openDeleteModal(conf: Conference, event: Event): void {
    event.stopPropagation();
    this.conferenceToDelete.set(conf);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.conferenceToDelete.set(null);
  }

  confirmDelete(): void {
    const conf = this.conferenceToDelete();
    if (conf && conf.id !== undefined) {
      this.conferenceService.delete(conf.id).subscribe({
        next: () => {
          this.loadConferences();
          this.closeDeleteModal();
          this.showSuccess('Conférence supprimée avec succès !');
        },
        error: () => {
          this.errorMessage.set('Erreur lors de la suppression.');
          this.closeDeleteModal();
        },
      });
    }
  }

  quickReserve(conf: Conference, event: Event): void {
    event.stopPropagation();
    if (conf.availableSeats > 0) {
      const updated: Conference = {
        ...conf,
        availableSeats: conf.availableSeats - 1,
      };
      this.conferenceService.update(updated).subscribe({
        next: () => {
          this.loadConferences();
          this.showSuccess(`Place réservée pour « ${conf.name} » !`);
        },
        error: () => {
          this.errorMessage.set('Erreur lors de la réservation.');
        },
      });
    }
  }

  private showSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 3500);
  }
}