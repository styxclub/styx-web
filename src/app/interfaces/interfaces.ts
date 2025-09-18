import { ParameterInterface } from '@interfaces/models/parameter.interfaces';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserSummary {
  id: number;
  username: string;
  reputation: number;
  votes: number;
  credits: number;
  bio: string;
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
  parameters: ParameterInterface[];
}

export interface SessionData {
  user: UserSummary | null;
  parameters: ParameterInterface[];
  refresh_token?: string;
  access_token?: string;
  access_expires_at?: number;
}

export type PhotoSize = 'sm' | 'md' | 'xl';
