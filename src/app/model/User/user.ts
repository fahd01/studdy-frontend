import { Role } from "../enum/Role.enum";

export class User {
  userId: number;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
  locked: boolean;
  loginAttempts: number;
  profilePic?: string;
  accessToken?: string;
  refreshToken?: string;
  role: Role;

  constructor(
    userId: number = 0,
    username: string = '',
    email: string = '',
    password: string = '',
    phoneNumber: string = '',
    birthDate: Date = new Date(),
    locked: boolean,
    loginAttempts: number = 0,
    role: Role = Role.ADMIN, // Set default role if needed
    accessToken?: string,
    refreshToken?: string,
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.locked = locked;
    this.loginAttempts = loginAttempts;
    this.role = role;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
