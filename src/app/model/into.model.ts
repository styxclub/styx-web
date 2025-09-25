import { IntoInterface } from '@interfaces/models/into.interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Into {
  constructor(public id: number | null = null, public name: string | null = null) {}

  fromInterface(into: IntoInterface): Into {
    this.id = into.id;
    this.name = urldecode(into.name);
    return this;
  }

  toInterface(): IntoInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
    };
  }
}
