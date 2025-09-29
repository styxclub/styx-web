import { UserInterface } from '@interfaces/models/user.interfaces';

export interface VoteInterface {
  id: number | null;
  idUserFrom: number | null;
  userFrom: UserInterface | null;
  idUserTo: number | null;
  userTo: UserInterface | null;
  idRequest: number | null;
  vote: number | null;
}
