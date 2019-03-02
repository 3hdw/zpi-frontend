export class PlayerDTO {
  constructor(private email: string,
              private nickname: string,
              private password: string,
              private id: number = 0) {
  }
}
