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

@Component({
  selector: 'app-popup-parameter',
  imports: [],
  templateUrl: './popup-parameter.html',
  styleUrl: './popup-parameter.scss',
})
export default class PopupParameter implements OnInit {
  authStore: AuthStore = inject(AuthStore);
  id: InputSignal<number> = input.required<number>();
  title: WritableSignal<string> = signal<string>('');
  body: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {
    const param: Parameter | null = this.authStore.getParameterById(this.id());
    if (param) {
      this.title.set(param.title ?? '');
      this.body.set(param.body ?? '');
    }
  }
}
