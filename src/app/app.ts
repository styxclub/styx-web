import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import Header from './shared/header/header';
import Menu from './shared/menu/menu';

@Component({
  selector: 'app-root',
  imports: [CardModule, ButtonModule, Header, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
