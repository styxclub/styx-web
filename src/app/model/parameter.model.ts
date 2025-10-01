import { ParameterInterface } from '@interfaces/models/parameter.interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Parameter {
  show: boolean = false;
  num: number = 1;
  text: string = '';
  date: Date = new Date();
  checked: boolean = false;

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

  cloneWithText(text: string): Parameter {
    const newParameter: Parameter = new Parameter().fromInterface(this.toInterface());
    newParameter.text = text;
    return newParameter;
  }

  cloneWithNum(num: number): Parameter {
    const newParameter: Parameter = new Parameter().fromInterface(this.toInterface());
    newParameter.num = num;
    return newParameter;
  }

  cloneWithDate(date: Date): Parameter {
    const newParameter: Parameter = new Parameter().fromInterface(this.toInterface());
    newParameter.date = date;
    return newParameter;
  }

  cloneWithChecked(checked: boolean): Parameter {
    const newParameter: Parameter = new Parameter().fromInterface(this.toInterface());
    newParameter.checked = checked;
    return newParameter;
  }
}
