export class Letter {

  constructor(private _character: string, private _points: number = -1) {
    if (this._points === -1) {
      this.assignPoints();
    }
  }

  get points(): number {
    return this._points;
  }

  get character(): string {
    return this._character;
  }

  private assignPoints() {
    if (this._character === 'A' || this._character === 'E' || this._character === 'I' || this._character === 'N'
      || this._character === 'O' || this._character === 'R' || this._character === 'S' || this._character === 'W'
      || this._character === 'Z') {
      this._points = 1;
    } else if (this._character === 'C' || this._character === 'D' || this._character === 'K'
      || this._character === 'L' || this._character === 'M' || this._character === 'P'
      || this._character === 'T'
      || this._character === 'Y') {
      this._points = 2;
    } else if (this._character === 'B' || this._character === 'G' || this._character === 'H'
      || this._character === 'J' || this._character === 'Ł' || this._character === 'U') {
      this._points = 3;
    } else if (this._character === 'Ą' || this._character === 'Ę' || this._character === 'F'
      || this._character === 'Ó' || this._character === 'Ś' || this._character === 'Ż') {
      this._points = 5;
    } else if (this._character === 'Ć') {
      this._points = 6;
    } else if (this._character === 'Ń') {
      this._points = 7;
    } else if (this._character === 'Ź') {
      this._points = 9;
    } else {
      this._points = -1;
    }
  }
}
