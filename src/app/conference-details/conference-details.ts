import { Component, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference-details',
  imports: [RouterLink],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails implements OnInit {
  conf = signal<any>(null);
  id = input.required<string>();

  constructor(private conferenceService: ConferenceService) {}

  ngOnInit(): void {
    this.conf.set(this.conferenceService.getConferenceById(this.id()));
  }

  onReserve(): void {
    const conf = this.conf();
    if (conf && conf.availableSeats > 0) {
      this.conferenceService.reserve(conf.id);
      this.conf.set(this.conferenceService.getConferenceById(this.id()));
    }
  }
}