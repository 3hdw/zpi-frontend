export class Letter {

  private _points: number;

  constructor(private _character: string) {
    this._points = 1;
  }

  get points(): number {
    return this._points;
  }

  get character(): string {
    return this._character;
  }
}
