import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import ICON_SIZES from '@interfaces/icon-sizes.enum';
import { Calendar } from '@primeicons/angular/calendar';
import { Comments } from '@primeicons/angular/comments';
import { Home } from '@primeicons/angular/home';
import { User } from '@primeicons/angular/user';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, Home, Calendar, Comments, User],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export default class Menu {
  readonly ICON_SIZES = ICON_SIZES;
}
