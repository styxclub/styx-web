import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import ClassMapperService from '@app/services/class-mapper-service';
import { LoginResponse, SessionData, UserSummary } from '@interfaces/interfaces';
import { ParameterInterface } from '@interfaces/models/parameter.interfaces';
import Parameter from '@model/parameter.model';

const LS_KEY = 'styx.session.v1';

@Injectable({ providedIn: 'root' })
export default class AuthStore {
  private classMapperService: ClassMapperService = inject(ClassMapperService);

  private _user: WritableSignal<UserSummary | null> = signal<UserSummary | null>(null);
  private _parameters: WritableSignal<any[]> = signal<Parameter[]>([]);
  private _accessToken = signal<string | null>(null);
  private _accessExpires = signal<number | null>(null); // epoch ms
  private _refreshToken = signal<string | null>(null); // si no usas cookie

  readonly isAuthenticated = computed(() => {
    const t = this._accessToken();
    const exp = this._accessExpires();
    return !!t && !!exp && Date.now() < exp;
  });

  constructor() {
    effect(() => {
      const data: SessionData = {
        user: this._user(),
        parameters: this._parameters().map((p: Parameter): ParameterInterface => p.toInterface()),
        refreshToken: this._refreshToken() ?? undefined,
        accessToken: this._accessToken() ?? undefined,
        accessExpiresAt: this._accessExpires() ?? undefined,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    });
  }

  hydrate(): void {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as SessionData;
      this._user.set(data.user ?? null);
      this._parameters.set(this.classMapperService.getParameters(data.parameters ?? []));
      this._refreshToken.set(data.refreshToken ?? null);
      this._accessToken.set(data.accessToken ?? null);
      this._accessExpires.set(data.accessExpiresAt ?? null);
    } catch (err) {
      console.error(err);
    }
  }

  applyLoginResponse(res: LoginResponse): void {
    this._user.set(res.user);
    this._parameters.set(this.classMapperService.getParameters(res.parameters ?? []));

    const now: number = Date.now();
    const expiresAt: number = now + res.tokens.expiresIn * 1000;
    this._accessToken.set(res.tokens.accessToken);
    this._accessExpires.set(expiresAt);

    if (res.tokens.refreshToken) {
      this._refreshToken.set(res.tokens.refreshToken);
    }
  }

  applyTokens(access_token: string, expires_in: number, refresh_token?: string): void {
    this._accessToken.set(access_token);
    this._accessExpires.set(Date.now() + expires_in * 1000);
    if (refresh_token) {
      this._refreshToken.set(refresh_token);
    }
  }

  clear(): void {
    this._user.set(null);
    this._parameters.set([]);
    this._accessToken.set(null);
    this._accessExpires.set(null);
    this._refreshToken.set(null);
    localStorage.removeItem(LS_KEY);
  }

  user(): UserSummary | null {
    return this._user();
  }

  parameters(): Parameter[] {
    return this._parameters();
  }

  accessToken(): string | null {
    return this._accessToken();
  }

  refreshToken(): string | null {
    return this._refreshToken();
  }
}
