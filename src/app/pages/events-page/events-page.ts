import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-events-page',
  imports: [ButtonModule, RippleModule, RouterLink],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export default class EventsPage {}
