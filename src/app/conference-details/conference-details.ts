import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference-details',
  imports: [RouterLink],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails implements OnInit {
  // conférence avec l'id
  conf = signal<any>(null);

  constructor(
    private route: ActivatedRoute,
    private conferenceService: ConferenceService
  ) {}

  ngOnInit(): void {
    // récupérer l'id
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.conf.set(this.conferenceService.getConferenceById(id));
  }

  // réserver une place
  onReserve(): void {
    const conf = this.conf();
    if (conf && conf.availableSeats > 0) {
      this.conferenceService.reserveSeat(conf.id);
      this.conf.set(this.conferenceService.getConferenceById(conf.id));
    }
  }
}