import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import ICON_SIZES from '@interfaces/icon-sizes.enum';
import { Plus } from '@primeicons/angular/plus';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-events-page',
  imports: [ButtonModule, RouterLink, Plus],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export default class EventsPage {
  readonly ICON_SIZES = ICON_SIZES;
}
