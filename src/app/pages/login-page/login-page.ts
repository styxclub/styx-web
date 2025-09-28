import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';
import { LoginResponse } from '@interfaces/interfaces';
import AuthService from '@services/auth-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login-page',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    FloatLabel,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export default class LoginPage {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly auth: AuthService = inject(AuthService);
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);

  form = this.fb.group({
    username: this.fb.control<string>('', {
      validators: [Validators.required],
    }),
    password: this.fb.control<string>('', {
      validators: [Validators.required],
    }),
  });
  hidePassword: WritableSignal<boolean> = signal(true);
  submitting: WritableSignal<boolean> = signal(false);
  serverError: WritableSignal<string | null> = signal<string | null>(null);

  username = () => this.form.get('username');
  password = () => this.form.get('password');

  toggleHidePassword(): void {
    this.hidePassword.update((v: boolean): boolean => !v);
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.submitting());
  }

  async onSubmit(): Promise<void> {
    this.serverError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      const response: LoginResponse = await this.auth.login({
        username: this.username()!.value!,
        password: this.password()!.value!,
      });
      this.authStore.applyLoginResponse(response);
      this.form.reset();
      this.router.navigate(['/styx/home']);
    } catch (e: unknown) {
      const msg: string =
        e instanceof Error ? e.message : 'Nombre de usuario o contraseña incorrectos.';
      this.serverError.set(msg);
    } finally {
      this.submitting.set(false);
    }
  }
}
