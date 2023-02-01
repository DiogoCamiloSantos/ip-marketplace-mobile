import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginResponse } from "@models/login";
import { ApiProvider } from "@providers/api/api";
import { Observable, throwError, take } from "rxjs";

@Injectable()
export class LoginService {
  constructor(private api: ApiProvider) {}

  public login(user: string, password: string): Observable<LoginResponse> {
    try {
      const params = new HttpParams()
        .set("grant_type", "password")
        .set("UserName", user)
        .set("Password", password);

      return this.api.login<string>(params.toString()).pipe(take(1));
    } catch (error) {
      return throwError(error);
    }
  }

  public forgetPassword(login: string, url: string): Observable<any> {
    try {
      return this.api
        .post("usuarios/insereControleEmail", {
          Login: login,
          CaminhoTela: url + "/alterarSenha/2?token="
        })
        .pipe(take(1));
    } catch (error) {
      return (error);
    }
  }
}
