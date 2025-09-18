import { ChatInterface } from '@app/interfaces/models/chat.interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Chat {
  constructor(
    public id: number = -1,
    public idRequest: number | null = null,
    public idUserFrom: number = -1,
    public username: string | null = null,
    public body: string | null = null,
    public isRead: boolean = false,
    public createdAt: string = ''
  ) {}

  fromInterface(c: ChatInterface): Chat {
    this.id = c.id;
    this.idRequest = c.idRequest;
    this.idUserFrom = c.idUserFrom;
    this.username = urldecode(c.username);
    this.body = urldecode(c.body);
    this.isRead = c.isRead;
    this.createdAt = c.createdAt;
    return this;
  }

  toInterface(): ChatInterface {
    return {
      id: this.id,
      idRequest: this.idRequest,
      idUserFrom: this.idUserFrom,
      username: urlencode(this.username),
      body: urlencode(this.body),
      isRead: this.isRead,
      createdAt: this.createdAt,
    };
  }

  get date(): string | null {
    if (this.createdAt === null || this.createdAt === '') {
      return null;
    }
    const date: string[] = this.createdAt.split(' ');
    return date[0];
  }

  get hour(): string | null {
    if (this.createdAt === null || this.createdAt === '') {
      return null;
    }
    const date: string[] = this.createdAt.split(' ');
    const hour: string[] = date[1].split(':');
    return `${hour[0]}:${hour[1]}`;
  }
}
