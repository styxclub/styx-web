import { IntoInterface } from '@interfaces/models/into.interfaces';

export interface UserInterface {
  id: number | null;
  username: string | null;
  bio: string | null;
  credits: number | null;
  reputation: number | null;
  votes: number | null;
  intos: IntoInterface[];
}
