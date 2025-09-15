import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Header from '@shared/header/header';
import Menu from '@shared/menu/menu';

@Component({
  selector: 'app-shell-layout',
  imports: [Header, Menu, RouterOutlet],
  templateUrl: './shell-layout.html',
  styleUrl: './shell-layout.scss',
})
export default class ShellLayout {}
