export interface AuthModelProps {
  clientId: string;
  password: string;
}

export class AuthModel {
  readonly clientId: string;
  readonly password: string;

  constructor(props: AuthModelProps) {
    this.clientId = props.clientId;
    this.password = props.password;
  }
}
