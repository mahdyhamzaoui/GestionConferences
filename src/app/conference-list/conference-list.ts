import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference-list',
  imports: [RouterLink],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  private conferenceService = inject(ConferenceService);

  // liste des conférences à partir du service
  conferences = this.conferenceService.conferences;
}