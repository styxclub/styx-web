import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequestEnrolled, RequestParameter } from '@interfaces/home.interfaces';
import Request from '@model/request.model';
import PopupEnrolled from '@shared/popup-enrolled/popup-enrolled';
import PopupEnrolledDirective from '@shared/popup-enrolled/popup-enrolled-directive';
import PopupParameter from '@shared/popup-parameter/popup-parameter';
import PopupParameterDirective from '@shared/popup-parameter/popup-parameter-directive';
import PopupUser from '@shared/popup-user/popup-user';
import PopupUserDirective from '@shared/popup-user/popup-user-directive';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-request-item',
  imports: [
    UserPhoto,
    PopupParameterDirective,
    PopupEnrolledDirective,
    PopupUserDirective,
    RouterLink,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './request-item.html',
  styleUrl: './request-item.scss',
})
export default class RequestItem implements OnInit {
  dialogService: DialogService = inject(DialogService);

  request: InputSignal<Request> = input.required<Request>();
  isMobile: InputSignal<boolean> = input.required<boolean>();
  idUser: number | null | undefined = null;
  refParameter: DynamicDialogRef | undefined;
  refEnrolled: DynamicDialogRef | undefined;
  refUser: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.idUser = this.request().user?.id;
  }

  showParameter(parameter: RequestParameter): void {
    if (!this.isMobile()) {
      return;
    }
    this.refParameter = this.dialogService.open(PopupParameter, {
      header: parameter.title,
      width: '75vw',
      modal: true,
      closable: true,
      focusOnShow: false,
      data: { id: parameter.idParameter },
    });
  }

  showEnrolled(enrolled: RequestEnrolled[]): void {
    if (!this.isMobile()) {
      return;
    }
    this.refEnrolled = this.dialogService.open(PopupEnrolled, {
      header: 'Apuntados',
      width: '75vw',
      modal: true,
      closable: true,
      focusOnShow: false,
      data: { enrolled },
    });
  }

  showUser(id: number, username: string): void {
    if (!this.isMobile()) {
      return;
    }
    this.refUser = this.dialogService.open(PopupUser, {
      header: username,
      width: '75vw',
      modal: true,
      closable: true,
      focusOnShow: false,
      data: { id },
    });
  }
}
