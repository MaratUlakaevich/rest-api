export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: number; // using bitwise masks
  confirmed?: boolean;
  confirmationCode?: string;
}
