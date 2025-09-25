import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequestParameter } from '@interfaces/home.interfaces';
import Request from '@model/request.model';
import PopupParameter from '@shared/popup-parameter/popup-parameter';
import PopupParameterDirective from '@shared/popup-parameter/popup-parameter-directive';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-request-item',
  imports: [UserPhoto, PopupParameterDirective, RouterLink, ButtonModule, TooltipModule],
  templateUrl: './request-item.html',
  styleUrl: './request-item.scss',
})
export default class RequestItem implements OnInit {
  dialogService: DialogService = inject(DialogService);

  request: InputSignal<Request> = input.required<Request>();
  isMobile: InputSignal<boolean> = input.required<boolean>();
  idUser: number | null | undefined = null;
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.idUser = this.request().user?.id;
  }

  showParameter(parameter: RequestParameter): void {
    this.ref = this.dialogService.open(PopupParameter, {
      header: parameter.title,
      width: '75vw',
      modal: true,
      closable: true,
      data: { id: parameter.idParameter },
    });
  }
}
