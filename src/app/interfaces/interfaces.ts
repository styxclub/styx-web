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
  isActive: boolean;
}

export interface Tokens {
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
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
  refreshToken?: string;
  accessToken?: string;
  accessExpiresAt?: number;
}

export type PhotoSize = 'sm' | 'md' | 'xl';
