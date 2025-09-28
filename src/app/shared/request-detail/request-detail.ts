import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusResponse } from '@app/interfaces/interfaces';
import { RequestEnrolled } from '@interfaces/home.interfaces';
import Request from '@model/request.model';
import { getDate } from '@osumi/tools';
import RequestService from '@services/request-service';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-request-detail',
  imports: [UserPhoto, ButtonModule, DatePickerModule, FormsModule],
  templateUrl: './request-detail.html',
  styleUrl: './request-detail.scss',
})
export default class RequestDetail implements OnInit {
  private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly requestService: RequestService = inject(RequestService);

  step: WritableSignal<number> = signal<number>(0);

  request: WritableSignal<Request | null> = signal<Request | null>(null);
  enrolled: WritableSignal<RequestEnrolled[]> = signal<RequestEnrolled[]>([]);

  completedAt: WritableSignal<Date> = signal<Date>(new Date());

  ngOnInit(): void {
    if (this.config && this.config.data) {
      const request: Request | undefined = this.config.data['request'];
      if (request) {
        this.enrolled.set(request.enrolled);
      }
    }
  }

  goToClose(): void {
    this.step.set(1);
  }

  async closeRequest(): Promise<void> {
    const completedAtDate: string = getDate({
      date: new Date(),
      separator: '-',
      withHours: true,
      withSeconds: true,
      pattern: 'ymdhis',
    });
    const id: number | null | undefined = this.request()?.id;
    if (id) {
      const response: StatusResponse = await this.requestService.requestClose(id, completedAtDate);
      if (response && response.status === 'ok') {
      }
    }
  }
}
