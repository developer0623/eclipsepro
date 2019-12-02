export const ALL = '[ALL]';
export const IN = '[IN]';
export const RANGE = '[RANGE]';

export class In<T> {
  public type = IN;
  constructor(
    public property: keyof T,
    public values: any[]
  ) {
    if (values.length === 0) { throw new Error('`values` array cannot be empty'); }
  }
}
export class All {
  public type = ALL;
  constructor() { }
}
export class Range {
  public type = RANGE;
  constructor(
    public property: string,
    public start: any,
    public end: any
  ) { }
}

export type FilterDef<T> = In<T> | All | Range;
export function toFilterExpr<T>(filterDef: FilterDef<T>): (T) => boolean {
  switch (filterDef.type) {
    case ALL: { return _ => true; }
    case IN: {
      const init = (t: T) => false;
      const in_filter = filterDef as In<T>;
      return in_filter.values.reduce((acc, value) => ((t: T) => t[in_filter.property] === value || acc(t)), init);
    }
    case RANGE: {
      throw new Error('Not implemented');
    }
  }
}
export class Subscription<T> {
  public id: string;

  constructor(
    public collection: string,
    public filterDef: FilterDef<T>
  ) {
    this.id = this.uuidv4();
  }

  private uuidv4() {
    // from https://stackoverflow.com/a/2117523/947
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
