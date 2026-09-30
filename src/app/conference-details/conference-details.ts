import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-conference-details',
  imports: [],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails {
  conf = input<any>();
  registered = output<any>();

  // réserver une place
  onRegister() {
    if (this.conf().availableSeats > 0) {
      this.registered.emit(this.conf());
    }
  }
}