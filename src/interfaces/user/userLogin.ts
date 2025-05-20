export interface UserLoginRequest {
  userDocument: string;
  password: string;
}

export interface User {
  userDocument: string;
  email: string;
  names: string;
  lastNames: string;
  isActive: boolean;
  areas: string[];
  roles: string[];
}

export interface UserLoginResponse {
  data: UserLoginResponseData;
  errors: string[] | null;
  status: number;
  ok: boolean;
}

export interface UserLoginResponseData {
  _id: string;
  userDocument: string;
  email: string;
  names: string;
  lastNames: string;
  isActive: boolean;
  areas: string[];
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  token: string;
  refreshTokenId: string;
}
