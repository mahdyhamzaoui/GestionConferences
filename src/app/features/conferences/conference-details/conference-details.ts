import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConferenceService } from '../services/conference.service';
import { Conference } from '../models/conference';

@Component({
  selector: 'app-conference-details',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails implements OnInit {
  private conferenceService = inject(ConferenceService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  id = input.required<string>();
  conf = signal<Conference | null>(null);
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  showEditModal = signal<boolean>(false);

  editForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required]],
    date: ['', [Validators.required]],
    place: ['', [Validators.required]],
    speaker: ['', [Validators.required]],
    availableSeats: [0, [Validators.required, Validators.min(0)]],
  });

  showDeleteModal = signal<boolean>(false);

  categories = [
    'Architecture Web',
    'Intelligence Artificielle',
    'Cloud & Infrastructure',
    'Cybersécurité',
    'Mobile & Cross-Platform',
    'DevOps & CI/CD',
  ];

  ngOnInit(): void {
    this.loadConference();
  }

  loadConference(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.conferenceService.getById(Number(this.id())).subscribe({
      next: (data) => {
        this.conf.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.conf.set(null);
        this.loading.set(false);
        this.errorMessage.set('Conférence introuvable ou serveur indisponible.');
      },
    });
  }

  onReserve(): void {
    const current = this.conf();
    if (current && current.availableSeats > 0) {
      const updated: Conference = {
        ...current,
        availableSeats: current.availableSeats - 1,
      };
      this.conferenceService.update(updated).subscribe({
        next: (res) => {
          this.conf.set(res);
          this.showSuccess('Place réservée avec succès !');
        },
        error: () => {
          this.errorMessage.set('Erreur lors de la réservation de la place.');
        },
      });
    }
  }

  openEditModal(): void {
    const current = this.conf();
    if (current) {
      this.editForm.patchValue({
        name: current.name,
        category: current.category,
        date: current.date,
        place: current.place,
        speaker: current.speaker,
        availableSeats: current.availableSeats,
      });
      this.showEditModal.set(true);
    }
  }

  closeEditModal(): void {
    this.showEditModal.set(false);
  }

  saveEdit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const val = this.editForm.getRawValue();
    const updated: Conference = {
      id: Number(this.id()),
      name: val.name!,
      category: val.category!,
      date: val.date!,
      place: val.place!,
      speaker: val.speaker!,
      availableSeats: Number(val.availableSeats),
    };

    this.conferenceService.update(updated).subscribe({
      next: (res) => {
        this.conf.set(res);
        this.closeEditModal();
        this.showSuccess('Conférence mise à jour avec succès !');
      },
      error: () => {
        this.errorMessage.set('Erreur lors de la mise à jour de la conférence.');
      },
    });
  }

  openDeleteModal(): void {
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
  }

  confirmDelete(): void {
    this.conferenceService.delete(Number(this.id())).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.router.navigate(['/conferences']);
      },
      error: () => {
        this.errorMessage.set('Erreur lors de la suppression de la conférence.');
        this.closeDeleteModal();
      },
    });
  }

  private showSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 3500);
  }
}