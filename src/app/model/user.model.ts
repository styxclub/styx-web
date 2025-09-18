import { UserInterface } from '@interfaces/models/user.interfaces';

export default class User {
  constructor(
    public id: number | null = null,
    public username: string | null = null,
    public bio: string | null = null,
    public reputation: number | null = null,
    public votes: number | null = null
  ) {}

  fromInterface(ui: UserInterface): User {
    this.id = ui.id;
    this.username = ui.username;
    this.bio = ui.bio;
    this.reputation = ui.reputation;
    this.votes = ui.votes;
    return this;
  }
}
