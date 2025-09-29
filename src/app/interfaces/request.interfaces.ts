import { UserInterface } from '@interfaces/models/user.interfaces';
import { VoteInterface } from '@interfaces/models/vote.interfaces';

export interface RequestVotesResponse {
  status: string;
  votes: VoteInterface[];
}

export interface UserVote {
  id: number;
  vote: number;
}

export interface RequestVotesSavedResponse {
  status: string;
  allVoted: boolean;
  user: UserInterface;
}
