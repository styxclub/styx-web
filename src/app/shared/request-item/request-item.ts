import { Component, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Request from '@model/request.model';
import UserPhoto from '@shared/user-photo/user-photo';

@Component({
  selector: 'app-request-item',
  imports: [UserPhoto, RouterLink],
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
