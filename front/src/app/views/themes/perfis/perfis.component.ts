import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.css'],
})
export class PerfisComponent implements OnInit {
  constructor(private perfil: PerfilService, private router: Router) {}

  @Input() perilVarClasse;
  env = environment.apifile;
  show: any;
  config = localStorage.getItem('config');
  ngOnInit(): void {
    console.log('this.config :', this.config);
    if (this.config === 'false') {
      this.show = false;
    }
    // console.log('perilVarClasse:', this.perilVarClasse);
  }
  editar(perfil) {
    // let editperfil = '';
    // Swal.fire({
    //   title: 'Digite o Nome',
    //   input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off',
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Confirmar',
    //   showLoaderOnConfirm: true,
    //   cancelButtonText: 'Cancelar',
    // }).then((result) => {
    //   if (result.value) {
    //     editperfil = result.value;
    //     console.log('editperfil:', editperfil);
    //     this.mensagemService
    //       .editar(perfil._id)
    //       .subscribe((res) => {
    //         console.log(res);
    //         window.location.reload();
    //       });
    // id: string,
    // nome?: string,
    // restricao?: boolean,
    // imagemUrl?: string,
    // descricao?: string
    // }
    // });

    // console.log(perfil);
    if (this.config === 'false') {
      this.show = true;
      localStorage.setItem('config', 'true');
    }
  }
  deletar(perfil) {
    this.perfil.deletarPerfil(perfil._id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
    if (this.config === 'false') {
      this.show = true;
      localStorage.setItem('config', 'true');
    }
  }
  video() {
    this.router.navigateByUrl('/video');
  }
}
