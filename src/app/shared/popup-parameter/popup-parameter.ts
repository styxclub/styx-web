import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import AuthStore from '@auth/auth-store';
import Parameter from '@model/parameter.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-popup-parameter',
  imports: [],
  templateUrl: './popup-parameter.html',
  styleUrl: './popup-parameter.scss',
})
export default class PopupParameter implements OnInit {
  authStore: AuthStore = inject(AuthStore);
  config: DynamicDialogConfig = inject(DynamicDialogConfig);

  id: InputSignal<number | null> = input<number | null>(null);
  title: WritableSignal<string> = signal<string>('');
  body: WritableSignal<string> = signal<string>('');
  isMobile: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    const id: number | null = this.id();
    if (id !== null) {
      this.loadParameter(id);
    }
    if (this.config && this.config.data) {
      this.isMobile.set(true);
      const idParam: number | undefined = this.config.data['id'];
      if (idParam) {
        this.loadParameter(idParam);
      }
    }
  }

  loadParameter(id: number): void {
    const param: Parameter | null = this.authStore.getParameterById(id);
    if (param) {
      this.title.set(param.title ?? '');
      this.body.set(param.body ?? '');
    }
  }
}
