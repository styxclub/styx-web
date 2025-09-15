export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserSummary {
  id: number;
  username: string;
}

export interface Tokens {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

export interface LoginResponse {
  status: string;
  user: UserSummary;
  tokens: Tokens;
}

export interface SessionData {
  user: UserSummary | null;
  refresh_token?: string;
  access_token?: string;
  access_expires_at?: number;
}
