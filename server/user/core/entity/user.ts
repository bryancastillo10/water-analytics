export class UserData {
  username!: string;
  email!: string;
  resetCode?: string;
  resetCodeExpiry?: Date;
}
