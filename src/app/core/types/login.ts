export interface ILogin {
  user: string;
  password: string;
}

export class Login implements ILogin {
  user: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  UserId: string;
  UserIdCriptografadoAmbienteLegado: string;
  Nome: string;
  PerfilId: string;
  Perfil: string;
  AlteraSenha: string;
  TokenAmbienteLegado: string;
  '.issued': string;
  '.expires': string;
}

export interface ButtonLogin {
  error?: boolean;
  success?: boolean;
  done?: boolean;
  loading?: boolean;
  callback?: Function;
}

export interface WorkspaceUserSync {
  workspaceId: number,
  userId: number,
  date: Date,
  sync: boolean
}