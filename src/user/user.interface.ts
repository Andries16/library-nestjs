export interface User {
  name: string;
  email: string;
  token: string;
  password: string;
  role: number;
}

export interface UserRo {
  user: User;
}
