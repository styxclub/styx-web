import { IntoInterface } from '@app/interfaces/models/into.interfaces';
import { UserInterface } from '@interfaces/models/user.interfaces';
import { urldecode } from '@osumi/tools';
import Into from './into.model';

export default class User {
  constructor(
    public id: number | null = null,
    public username: string | null = null,
    public bio: string | null = null,
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
}
