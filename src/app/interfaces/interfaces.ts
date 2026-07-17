import { ParameterInterface } from '@interfaces/models/parameter.interfaces';
import { MenuItem } from 'primeng/api';

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

export interface LoginData {
  username: string;
  password: string;
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

export interface PositionInterface {
  x: number;
  y: number;
}

export interface StatusResponse {
  status: string;
}

export interface AppMenuItem extends MenuItem {
  iconName?: string;
}
