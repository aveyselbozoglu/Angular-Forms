type ColumnType = "dxTextBox" | "dxDateBox" | "dxSelectBox";
export class RakunTest<T> {


  value: T | undefined
  key: string
  label: string
  order: number
  required: boolean
  controlType: string
  type: string


  // public caption: string; // uv
  // public field: any;  // string
  // public type: ColumnType;
  // public format: string;
  // public options: Object;


  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;

  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';

  }
}
