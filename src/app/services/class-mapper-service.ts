import { Injectable } from '@angular/core';
import { ChatInterface } from '@interfaces/models/chat.interfaces';
import { ParameterInterface } from '@interfaces/models/parameter.interfaces';
import { UserInterface } from '@interfaces/models/user.interfaces';
import { VoteInterface } from '@interfaces/models/vote.interfaces';
import Chat from '@model/chat.model';
import Parameter from '@model/parameter.model';
import User from '@model/user.model';
import Vote from '@model/vote.model';

@Injectable({
  providedIn: 'root',
})
export default class ClassMapperService {
  getParameter(p: ParameterInterface): Parameter {
    return new Parameter().fromInterface(p);
  }

  getParameters(ps: ParameterInterface[]): Parameter[] {
    return ps.map((p: ParameterInterface): Parameter => {
      return this.getParameter(p);
    });
  }

  getChat(c: ChatInterface): Chat {
    return new Chat().fromInterface(c);
  }

  getChats(cs: ChatInterface[]): Chat[] {
    return cs.map((c: ChatInterface): Chat => {
      return this.getChat(c);
    });
  }

  getUser(u: UserInterface): User {
    return new User().fromInterface(u, true);
  }

  getUsers(us: UserInterface[]): User[] {
    return us.map((u: UserInterface): User => {
      return this.getUser(u);
    });
  }

  getVote(v: VoteInterface): Vote {
    return new Vote().fromInterface(v);
  }

  getVotes(vs: VoteInterface[]): Vote[] {
    return vs.map((v: VoteInterface): Vote => {
      return this.getVote(v);
    });
  }
}
