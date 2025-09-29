import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';
import { RequestEnrolled, RequestParameter } from '@interfaces/home.interfaces';
import Request from '@model/request.model';
import PopupEnrolled from '@shared/popup-enrolled/popup-enrolled';
import PopupEnrolledDirective from '@shared/popup-enrolled/popup-enrolled-directive';
import PopupParameter from '@shared/popup-parameter/popup-parameter';
import PopupParameterDirective from '@shared/popup-parameter/popup-parameter-directive';
import PopupUser from '@shared/popup-user/popup-user';
import PopupUserDirective from '@shared/popup-user/popup-user-directive';
import RequestDetail from '@shared/request-detail/request-detail';
import UserPhoto from '@shared/user-photo/user-photo';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-request-item',
  imports: [
    UserPhoto,
    PopupParameterDirective,
    PopupEnrolledDirective,
    PopupUserDirective,
    ButtonModule,
    TooltipModule,
    ToastModule,
  ],
  templateUrl: './request-item.html',
  styleUrl: './request-item.scss',
})
export default class RequestItem implements OnInit, OnDestroy {
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);
  private readonly messageService: MessageService = inject(MessageService);

  request: InputSignal<Request> = input.required<Request>();
  isMobile: InputSignal<boolean> = input.required<boolean>();
  idUser: number | null | undefined = null;
  refParameter: DynamicDialogRef | null = null;
  refEnrolled: DynamicDialogRef | null = null;
  refUser: DynamicDialogRef | null = null;
  refDetail: DynamicDialogRef | null = null;

  ngOnInit(): void {
    this.idUser = this.request().user?.id;
  }

  openRequest(ev: MouseEvent): void {
    ev.preventDefault();
    const requestUserId: number | null | undefined = this.request().user?.id;
    const userId: number | undefined = this.authStore.user()?.id;
    // Si el evento es nuevo, si está ya finalizado (votado) o si no soy yo el que lo ha creado, mando al chat
    if (
      this.request().status === 0 ||
      this.request().status === 3 ||
      (this.request().status === 1 && requestUserId !== userId)
    ) {
      this.router.navigate(['/styx/chat', this.idUser, this.request().id]);
    }
    // Si el evento está cerrado y es mío o si soy uno de los apuntados, abro el detalle
    if (
      (this.request().status === 1 && requestUserId === userId) ||
      (this.request().status === 2 &&
        this.request().enrolled.findIndex((e: RequestEnrolled): boolean => e.idUser === userId) !==
          -1) ||
      requestUserId === userId
    ) {
      this.refDetail = this.dialogService.open(RequestDetail, {
        header: this.request().title ?? '',
        width: this.isMobile() ? '95vw' : '75vw',
        modal: true,
        closable: true,
        focusOnShow: false,
        data: { request: this.request() },
      });
      this.refDetail?.onClose.subscribe((result: any): void => {
        if (result === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Finalizado',
            detail: '¡Evento finalizado!',
          });
        }
      });
    }
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

  ngOnDestroy(): void {
    if (this.refParameter) {
      this.refParameter.close();
    }
    if (this.refEnrolled) {
      this.refEnrolled.close();
    }
    if (this.refUser) {
      this.refUser.close();
    }
    if (this.refDetail) {
      this.refDetail.close();
    }
  }
}
