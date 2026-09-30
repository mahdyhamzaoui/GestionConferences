import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-conference-list',
  imports: [],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  conferences = input<any>([]);
  selectedConference = input<any>();
  conferenceSelected = output<any>();

  // choisir une conference
  selectConference(conf: any): void {
    this.conferenceSelected.emit(conf);
  }
}