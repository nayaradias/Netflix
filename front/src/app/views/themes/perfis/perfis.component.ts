import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
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
    let editperfil = '';
    let infantil = (perfil.Restricao != null) ? perfil.Restricao : 0;
    console.log('infantil: ', infantil);
    Swal.mixin({
      title: 'Digite o novo nome',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Próximo <i class="fa fa-arrow-right"></i>',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Digite o novo nome',
        input: 'text'
      },
      {
        title: 'É perfil infantil?',
        input: 'checkbox',
        inputValue: infantil,
        inputPlaceholder: 'Sim, é um perfil infantil.'
      },
      {
        title: 'Atualize a imagem',
        input: 'text',
        confirmButtonText: 'Confirmar'
      }
    ]).then((result) => {
      debugger;
      if (result.value) {
        editperfil = result.value[0];
        infantil = result.value[1];
        console.log('editperfil:', editperfil);
        this.perfil
          .editarPerfil(perfil._id, editperfil, infantil)
          .subscribe((res) => {
            console.log(res);
            window.location.reload();
          });
    // id: string,
    // nome?: string,
    // restricao?: boolean,
    // imagemUrl?: string,
    // descricao?: string

    // .then((result) => {
    //   if (result.value) {
    //     const answers = JSON.stringify(result.value)
    //     Swal.fire({
    //       title: 'All done!',
    //       html: `
    //         Your answers:
    //         <pre><code>${answers}</code></pre>
    //       `,
    //       confirmButtonText: 'Lovely!'
    //     })
    //   }
    // })
    }
    });

    console.log('perfil: ', perfil);
    // if (this.config === 'false') {
    //   this.show = true;
    //   localStorage.setItem('config', 'true');
    // }
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
