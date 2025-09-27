import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RequestEnrolled } from '@interfaces/home.interfaces';
import Request from '@model/request.model';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-request-detail',
  imports: [UserPhoto, ButtonModule],
  templateUrl: './request-detail.html',
  styleUrl: './request-detail.scss',
})
export default class RequestDetail implements OnInit {
  config: DynamicDialogConfig = inject(DynamicDialogConfig);

  request: WritableSignal<Request | null> = signal<Request | null>(null);
  enrolled: WritableSignal<RequestEnrolled[]> = signal<RequestEnrolled[]>([]);

  ngOnInit(): void {
    if (this.config && this.config.data) {
      const request: Request | undefined = this.config.data['request'];
      if (request) {
        this.enrolled.set(request.enrolled);
      }
    }
  }
}
