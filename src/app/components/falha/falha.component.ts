import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-falha',
  templateUrl: './falha.component.html',
  styleUrls: ['./falha.component.scss']
})
export class FalhaComponent implements OnInit, OnDestroy {

  statusFalha: Number;
  detalhesFalha = '';
  inscricao: Subscription; // Usada para observar mudanças na URL

  constructor( private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
     // Obtêm o parâmetro através da rota da URL
   this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.statusFalha = Number(params['statusFalha']);
        switch (this.statusFalha) {
          case 404:
            this.detalhesFalha = 'Nenhum dado encontrado com os parâmetros fornecidos.';
          break;
          case 405:
            this.detalhesFalha = 'Parâmetro de pesquisa inválido.';
          break;
          case 503:
            this.detalhesFalha = 'Erro interno da API.';
          break;
          default:
            this.detalhesFalha = 'Erro desconhecido.';
        }
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
