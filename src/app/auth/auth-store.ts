import { Injectable, WritableSignal, computed, effect, signal } from '@angular/core';
import { LoginResponse, SessionData, UserSummary } from '@interfaces/interfaces';

const LS_KEY = 'styx.session.v1';

@Injectable({ providedIn: 'root' })
export default class AuthStore {
  private _user: WritableSignal<UserSummary | null> = signal<UserSummary | null>(null);
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
        refresh_token: this._refreshToken() ?? undefined,
        access_token: this._accessToken() ?? undefined,
        access_expires_at: this._accessExpires() ?? undefined,
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
      this._refreshToken.set(data.refresh_token ?? null);
      this._accessToken.set(data.access_token ?? null);
      this._accessExpires.set(data.access_expires_at ?? null);
    } catch (err) {
      console.error(err);
    }
  }

  applyLoginResponse(res: LoginResponse): void {
    this._user.set(res.user);

    const now = Date.now();
    const expiresAt = now + res.tokens.expires_in * 1000;
    this._accessToken.set(res.tokens.access_token);
    this._accessExpires.set(expiresAt);

    if (res.tokens.refresh_token) {
      this._refreshToken.set(res.tokens.refresh_token);
    }
  }

  applyTokens(access_token: string, expires_in: number, refresh_token?: string): void {
    this._accessToken.set(access_token);
    this._accessExpires.set(Date.now() + expires_in * 1000);
    if (refresh_token) this._refreshToken.set(refresh_token);
  }

  clear(): void {
    this._user.set(null);
    this._accessToken.set(null);
    this._accessExpires.set(null);
    this._refreshToken.set(null);
    localStorage.removeItem(LS_KEY);
  }

  user() {
    return this._user();
  }

  accessToken() {
    return this._accessToken();
  }

  refreshToken() {
    return this._refreshToken();
  }
}
