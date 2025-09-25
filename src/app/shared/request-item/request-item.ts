import { Component, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Request from '@model/request.model';
import PopupParameterDirective from '@shared/popup-parameter/popup-parameter-directive';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-request-item',
  imports: [UserPhoto, PopupParameterDirective, RouterLink, ButtonModule, TooltipModule],
  templateUrl: './request-item.html',
  styleUrl: './request-item.scss',
})
export default class RequestItem implements OnInit {
  request: InputSignal<Request> = input.required<Request>();
  idUser: number | null | undefined = null;

  ngOnInit(): void {
    console.log(this.request());
    this.idUser = this.request().user?.id;
  }
}
