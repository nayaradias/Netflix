import { Component, OnInit, Input } from '@angular/core';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilI } from 'src/app/core/interfaces/perfil.interface';
import { ContaI } from 'src/app/core/interfaces/conta.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  checkboxModel = { value: false };
  constructor(private perfilService: PerfilService, private fb: FormBuilder) {}
  perfis = [];
  formPerfil: FormGroup;
  show: any;

  ngOnInit(): void {
    this.show = false;
    this.perfilService.buscarPerfis().subscribe((res) => {
      console.log(res);
      this.perfis = res.perfis;
    });
    this.formPerfil = this.fb.group({
      Nome: this.fb.control('', [Validators.required]),
      ImagemUrl: this.fb.control('', null),
      Restricao: this.checkboxModel.value,
    });
  }
  abrirModal() {
    this.show = true;
  }
  adicionarPeril() {
    console.log(this.formPerfil.value);
    this.perfilService
      .cadastrarPerfil(this.formPerfil.value)
      .subscribe((res) => {
        console.log('cadastrarPerfil:', res);
      });
    this.show = false;
    window.location.reload();
  }
  ckeckValue() {
    if (this.checkboxModel.value === true) {
      this.checkboxModel.value = false;
    } else {
      this.checkboxModel.value = true;
    }
  }
}
