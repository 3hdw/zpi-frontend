export class Result {
  constructor(private _hasFinished: boolean, private _hasFailed: boolean) {
  }

  get hasFinished(): boolean {
    return this._hasFinished;
  }

  get hasFailed(): boolean {
    return this._hasFailed;
  }
}
