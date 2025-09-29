import { VoteInterface } from '@interfaces/models/vote.interfaces';
import User from '@model/user.model';

export default class Vote {
  constructor(
    public id: number | null = null,
    public idUserFrom: number | null = null,
    public userFrom: User | null = null,
    public idUserTo: number | null = null,
    public userTo: User | null = null,
    public idRequest: number | null = null,
    public vote: number | null = null
  ) {}

  fromInterface(vote: VoteInterface): Vote {
    this.id = vote.id;
    this.idUserFrom = vote.idUserFrom;
    this.userFrom = vote.userFrom ? new User().fromInterface(vote.userFrom, true) : null;
    this.idUserTo = vote.idUserTo;
    this.userTo = vote.userTo ? new User().fromInterface(vote.userTo, true) : null;
    this.idRequest = vote.idRequest;
    this.vote = vote.vote;
    return this;
  }

  toInterface(): VoteInterface {
    return {
      id: this.id,
      idUserFrom: this.idUserFrom,
      userFrom: this.userFrom ? this.userFrom.toInterface(true) : null,
      idUserTo: this.idUserTo,
      userTo: this.userTo ? this.userTo.toInterface(true) : null,
      idRequest: this.idRequest,
      vote: this.vote,
    };
  }
}
