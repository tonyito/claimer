export default class Authentication {
  public email: string;
  public password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class SignUpData extends Authentication {
  public username: string;
  constructor(email: string, password: string, username: string) {
    super(email, password);
    this.username = username;
  }
}
