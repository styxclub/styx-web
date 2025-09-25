import { IntoInterface } from '@interfaces/models/into.interfaces';

export interface UserInterface {
  id: number | null;
  username: string | null;
  bio: string | null;
  reputation: number | null;
  votes: number | null;
  intos: IntoInterface[];
}
