import { MessagePayload } from '@interfaces/home.interfaces';

export default class Message {
  kind: string = 'message';

  constructor(
    public id: number = -1,
    public idUser: number = -1,
    public username: string = '',
    public title: string = '',
    public body: string = '',
    public createdAt: string = ''
  ) {}

  fromInterface(m: MessagePayload): Message {
    this.id = m.id;
    this.idUser = m.idUser;
    this.username = m.username;
    this.title = m.title;
    this.body = m.body;
    this.createdAt = m.createdAt;
    return this;
  }

  toInterface(): MessagePayload {
    return {
      id: this.id,
      idUser: this.idUser,
      username: this.username,
      title: this.title,
      body: this.body,
      createdAt: this.createdAt,
    };
  }
}
