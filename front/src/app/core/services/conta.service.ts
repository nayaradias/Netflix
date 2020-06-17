import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ContaI } from '../interfaces/conta.interface';
import { Router } from '@angular/router';
const api = environment.api;

@Injectable()
export class ContaService {
  constructor(private http: HttpClient, private router: Router) {}

  cadastrarConta(usuario: ContaI): Observable<any> {
    return this.http.post(`${api}/conta`, usuario);
  }
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${api}/conta/login`, {
      Email: email,
      Senha: senha,
    });
  }
  buscarContaLogada(): Observable<any> {
    return this.http.get(`${api}/conta/info`);
  }
  editarConta(senha: string, telefone: string, id: string): Observable<any> {
    return this.http.put(`${api}/conta/editar/${id}`, {
      Senha: senha,
      Telefone: telefone,
    });
  }
  deletarConta(): Observable<any> {
    return this.http.delete(`${api}/conta/deletar/:id`);
  }
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);
    return token ? true : false;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}
