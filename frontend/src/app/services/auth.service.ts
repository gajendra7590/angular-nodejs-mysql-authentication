import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseURL = 'http://localhost:3000/';
  private _loginUrl = this._baseURL + 'api/auth/login';
  private _registerUrl = this._baseURL + 'api/auth/register';
  private _logoutUrl = this._baseURL + 'api/auth/logout';

  constructor(private _http: HttpClient) { }

  registerUser(userData) {
    return this._http.post<any>(this._registerUrl, userData);
  }

  loginUser(userData) {
    return this._http.post<any>(this._loginUrl, userData);
  }

  logOutUser() {
    return this._http.post<any>(this._logoutUrl, {});
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_data");
  }

}
