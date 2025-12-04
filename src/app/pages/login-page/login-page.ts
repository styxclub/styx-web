import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { disabled, Field, form, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';
import { LoginData, LoginResponse } from '@interfaces/interfaces';
import AuthService from '@services/auth-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login-page',
  imports: [
    CardModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    MessageModule,
    FloatLabel,
    FormsModule,
    NgOptimizedImage,
    Field,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export default class LoginPage {
  private readonly auth: AuthService = inject(AuthService);
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);

  loginModel: WritableSignal<LoginData> = signal<LoginData>({
    username: '',
    password: '',
  });
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username);
    required(schemaPath.password);
    disabled(schemaPath.username, (): boolean => this.submitting());
    disabled(schemaPath.password, (): boolean => this.submitting());
  });
  isValid: Signal<boolean> = computed(
    (): boolean =>
      this.loginForm.username().errors().length === 0 &&
      this.loginForm.password().errors().length === 0
  );
  hidePassword: WritableSignal<boolean> = signal(true);
  submitting: WritableSignal<boolean> = signal(false);
  serverError: WritableSignal<string | null> = signal<string | null>(null);

  toggleHidePassword(): void {
    this.hidePassword.update((v: boolean): boolean => !v);
  }

  async onSubmit(): Promise<void> {
    this.serverError.set(null);
    if (!this.isValid()) {
      return;
    }
    this.submitting.set(true);
    try {
      const response: LoginResponse = await this.auth.login(this.loginModel());
      this.authStore.applyLoginResponse(response);
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
