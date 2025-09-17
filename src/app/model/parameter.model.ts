import { ParameterInterface } from '@interfaces/models/parameter.interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Parameter {
  constructor(
    public id: number = -1,
    public title: string | null = null,
    public body: string | null = null,
    public cost: number = 0,
    public type: number = 0,
    public values: number[] = []
  ) {}

  fromInterface(data: ParameterInterface): Parameter {
    this.id = data.id;
    this.title = urldecode(data.title);
    this.body = urldecode(data.body);
    this.cost = data.cost;
    this.type = data.type;
    this.values = data.values;
    return this;
  }

  toInterface(): ParameterInterface {
    return {
      id: this.id,
      title: urlencode(this.title),
      body: urlencode(this.body),
      cost: this.cost,
      type: this.type,
      values: this.values,
    };
  }
}
