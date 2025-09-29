import { IntoInterface } from '@interfaces/models/into.interfaces';
import { UserInterface } from '@interfaces/models/user.interfaces';
import Into from '@model/into.model';
import { urldecode, urlencode } from '@osumi/tools';

export default class User {
  constructor(
    public id: number | null = null,
    public username: string | null = null,
    public bio: string | null = null,
    public credits: number | null = null,
    public reputation: number | null = null,
    public votes: number | null = null,
    public intos: Into[] = []
  ) {}

  fromInterface(ui: UserInterface, decode: boolean = false): User {
    this.id = ui.id;
    this.username = decode ? urldecode(ui.username) : ui.username;
    this.bio = decode ? urldecode(ui.bio) : ui.bio;
    this.reputation = ui.reputation;
    this.votes = ui.votes;
    this.intos =
      ui.intos && ui.intos.length > 0
        ? ui.intos.map((i: IntoInterface): Into => new Into().fromInterface(i))
        : [];
    return this;
  }

  toInterface(encode: boolean = false): UserInterface {
    return {
      id: this.id,
      username: encode ? urlencode(this.username) : this.username,
      bio: encode ? urlencode(this.bio) : this.bio,
      credits: this.credits,
      reputation: this.reputation,
      votes: this.votes,
      intos: this.intos.map((i: Into): IntoInterface => i.toInterface()),
    };
  }
}
