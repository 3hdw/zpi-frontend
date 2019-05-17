export class SocketMessage {
  constructor(private _header: string, private _body: any) {
  }

  get header(): string {
    return this._header;
  }

  get body(): any {
    return this._body;
  }
}
