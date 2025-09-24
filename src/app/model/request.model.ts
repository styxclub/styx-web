import { RequestParameter, RequestPayload } from '@interfaces/home.interfaces';
import User from '@model/user.model';

export default class Request {
  kind: string = 'message';

  constructor(
    public id: number | null = null,
    public user: User | null = null,
    public title: string | null = null,
    public body: string | null = null,
    public reward: number | null = null,
    public status: number | null = null,
    public completedAt: string | null = null,
    public createdAt: string | null = null,
    public participantsTotal: number | null = null,
    public participantsAccepted: number | null = null,
    public isEnrolled: boolean = false,
    public enrollmentStatus: number | null = null,
    public parameters: RequestParameter[] = []
  ) {}

  fromInterface(rp: RequestPayload): Request {
    this.id = rp.id;
    this.user = new User(rp.idUser, rp.username, null, rp.reputation, rp.votes);
    this.title = rp.title;
    this.body = rp.body;
    this.reward = rp.reward;
    this.status = rp.status;
    this.completedAt = rp.completedAt;
    this.createdAt = rp.createdAt;
    this.participantsTotal = rp.participantsTotal;
    this.participantsAccepted = rp.participantsAccepted;
    this.isEnrolled = rp.isEnrolled === 1;
    this.enrollmentStatus = rp.enrollmentStatus;
    this.parameters = rp.parameters;
    return this;
  }

  get date(): string | null {
    if (this.createdAt === null || this.createdAt === '') {
      return null;
    }
    const date: string[] = this.createdAt.split(' ');
    const dateParts: string[] = date[0].split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }
}
