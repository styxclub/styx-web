import { Injectable } from '@angular/core';
import { ParameterInterface } from '@app/interfaces/models/parameter.interfaces';
import Parameter from '@app/model/parameter.model';
import { ChatInterface } from '@interfaces/models/chat.interfaces';
import Chat from '@model/chat.model';

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
}
