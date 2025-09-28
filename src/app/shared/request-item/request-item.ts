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
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './request-item.html',
  styleUrl: './request-item.scss',
})
export default class RequestItem implements OnInit, OnDestroy {
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);

  request: InputSignal<Request> = input.required<Request>();
  isMobile: InputSignal<boolean> = input.required<boolean>();
  idUser: number | null | undefined = null;
  refParameter: DynamicDialogRef | undefined;
  refEnrolled: DynamicDialogRef | undefined;
  refUser: DynamicDialogRef | undefined;
  refDetail: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.idUser = this.request().user?.id;
  }

  openRequest(ev: MouseEvent): void {
    ev.preventDefault();
    if (
      this.request().status === 0 ||
      (this.request().status === 1 &&
        this.request().user !== null &&
        this.authStore.user() !== null &&
        this.request().user?.id !== this.authStore.user()?.id)
    ) {
      this.router.navigate(['/styx/chat', this.idUser, this.request().id]);
    }
    if (
      this.request().status === 1 &&
      this.request().user !== null &&
      this.authStore.user() !== null &&
      this.request().user?.id === this.authStore.user()?.id
    ) {
      this.refDetail = this.dialogService.open(RequestDetail, {
        header: this.request().title ?? '',
        width: this.isMobile() ? '95vw' : '75vw',
        modal: true,
        closable: true,
        focusOnShow: false,
        data: { request: this.request() },
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
