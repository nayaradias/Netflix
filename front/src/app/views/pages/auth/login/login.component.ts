import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaService } from 'src/app/core/services/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  checkboxModel = { value: false };
  constructor(
    private fb: FormBuilder,
    private conta: ContaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+'),
      ]),
      senha: this.fb.control('', [Validators.required]),
    });
  }
  submit() {
    this.conta
      .login(this.formLogin.value.email, this.formLogin.value.senha)
      .subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/perfis');
        // console.log('CHECKBOX: ', this.checkboxModel.value);
        if (!this.checkboxModel.value) {
          this.teste();
        }
      });
  }
  assinar() {
    this.router.navigateByUrl('/Auth/registro');
  }
  teste() {
    const tempoLimite = 4;
    let tempoInicial = 1;
    document.onmousemove = document.onkeypress = () => {
      tempoInicial = 0;
      console.log('tempo: mousemove', tempoInicial);
    };
    window.setInterval(() => {
      console.log('tempo: setInterval', tempoInicial);
      if (++tempoInicial >= tempoLimite) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    }, 3000);
  }
  ckeckValue() {
    if (this.checkboxModel.value === true) {
      this.checkboxModel.value = false;
    } else {
      this.checkboxModel.value = true;
    }
  }
}
