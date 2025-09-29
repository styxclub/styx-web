import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-events-page',
  imports: [ButtonModule, RippleModule],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export default class EventsPage {}
