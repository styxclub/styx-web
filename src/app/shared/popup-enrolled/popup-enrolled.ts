import {
  Component,
  inject,
  model,
  ModelSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RequestEnrolled } from '@interfaces/home.interfaces';
import ICON_SIZES from '@interfaces/icon-sizes.enum';
import { CheckCircle } from '@primeicons/angular/check-circle';
import { Star } from '@primeicons/angular/star';
import UserPhoto from '@shared/user-photo/user-photo';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-popup-enrolled',
  imports: [UserPhoto, Star, CheckCircle],
  templateUrl: './popup-enrolled.html',
  styleUrl: './popup-enrolled.scss',
})
export default class PopupEnrolled implements OnInit {
  private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);
  readonly ICON_SIZES = ICON_SIZES;

  enrolled: ModelSignal<RequestEnrolled[] | null> = model<RequestEnrolled[] | null>(null);
  isMobile: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    if (this.config && this.config.data) {
      this.isMobile.set(true);
      const enrolled: RequestEnrolled[] | undefined = this.config.data['enrolled'];
      if (enrolled) {
        this.enrolled.set(enrolled);
      }
    }
  }
}
