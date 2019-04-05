export class PlayerDTO {
  constructor(private _email: string,
              private _nickname: string,
              private _password: string,
              private _id: number = 0) {
  }


  get email(): string {
    return this._email;
  }

  get nickname(): string {
    return this._nickname;
  }

  get password(): string {
    return this._password;
  }

  get id(): number {
    return this._id;
  }
}
