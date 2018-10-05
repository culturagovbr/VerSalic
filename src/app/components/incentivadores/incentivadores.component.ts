import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MetaService } from '@ngx-meta/core';
import { ApiService } from './../../services/api.service';
import { DataFormatterService } from './../../services/data-formatter.service';
import { ConfigurationService } from './../../services/configuration.service';

import { Incentivador } from './../../models/incentivador.model';
import { Doacao } from './../../models/doacao.model';

declare var $: any;

@Component({
  selector: 'app-incentivadores',
  templateUrl: './incentivadores.component.html',
  styleUrls: ['./incentivadores.component.scss']
})
export class IncentivadoresComponent implements OnInit, OnDestroy {

  inscricao: Subscription; // Usada para observar mudanças na URL
  JSON: any = JSON;
  url: string = location.href;

  carregandoDados: boolean = false;
  carregandoDadosDoacoes: boolean = false;
  buscaPorDoacoesSemResultados: boolean = false;

  idIncentivador: String;
  incentivador: Incentivador;

  queriesDeDoacao: { [query: string]: String; } = {};
  listaDoacoes: [Doacao] = undefined;
  numeroDeItens: number;
  totalDeItens: number;
  totalDeItensCarregado = 0;
  paginaAtual = 1;
  offsetAtual: String = '0';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private dataFormatterService: DataFormatterService,
              private metaService: MetaService,
              private configurationService: ConfigurationService) { }

  ngOnInit() {
   // Obtêm o parâmetro através da rota da URL
   this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idIncentivador = params['idIncentivador'];
        this.onLoadIncentivador(this.idIncentivador);
        this.onLoadDoacoes(this.idIncentivador, this.paginaAtual);
      }
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.url) {
          window.scrollTo(0, 0);
        }
      }
    });

  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onLoadIncentivador(idIncentivador: String) {
    this.carregandoDados = true;
    this.listaDoacoes = undefined; // Garante que o objeto seja sobrescrito
                                    // caso estejamos voltando de outra página.

    this.apiService.getIncentivador(idIncentivador).subscribe(
      incentivador => {
        console.log(incentivador);
        this.incentivador = incentivador;
        this.atualizarMetaTags();
      },
      err => {
        this.carregandoDados = false;
        this.router.navigate(['falha', err]);
      },
      () => this.carregandoDados = false);
  }

  onLoadDoacoes(idIncentivador: String, index: number) {
    this.carregandoDadosDoacoes = true;
    this.buscaPorDoacoesSemResultados = false;

    this.queriesDeDoacao['limit'] = '' + this.configurationService.limitResultados;
    this.queriesDeDoacao['offset'] = (index - 1) * this.configurationService.limitResultados + '';
    this.offsetAtual = this.queriesDeDoacao['offset'];

    this.apiService.getListaDoacoesDoIncentivador(idIncentivador, this.queriesDeDoacao).subscribe(
      resposta => {
        this.listaDoacoes = resposta.listaDoacoesDoIncentivador;
        
        this.numeroDeItens = resposta.count;
        this.totalDeItens = resposta.total;
        this.totalDeItensCarregado += this.numeroDeItens;
      },
      err => {
        this.carregandoDadosDoacoes = false;

        if (err === 404) {
          this.buscaPorDoacoesSemResultados = true;
        } else {
          this.router.navigate(['falha', err]);
        }
      },
      () => { this.carregandoDadosDoacoes = false; window.scrollTo(0, 0); });
  }

  obterStringDeQuantidadeNaResposta() {
    return (Number(this.offsetAtual) + 1) + ' a ' + (Number(this.offsetAtual) + Number(this.numeroDeItens));
  }

  compartilharTelegram() {
    window.open('https://t.me/share/url?url=' + encodeURIComponent(window.location.href), '_blank');
  }

  atualizarMetaTags() {
    // Meta tags genéricas
    this.metaService.setTitle('Incentivador: ' +  this.incentivador.nome);
    this.metaService.setTag('description', `Portal de Visualização do 
                                            Sistema de Apoio às 
                                            Leis de Incentivo à Cultura.`);
    // Meta tags do Twitter
    this.metaService.setTag('twitter:card', 'summary');
    this.metaService.setTag('twitter:site', '@publisher_handle');
    this.metaService.setTag('twitter:title', 'Incentivador: ' +  this.incentivador.nome);
    this.metaService.setTag('twitter:description', `Portal de Visualização do 
                                                    Sistema de Apoio às 
                                                    Leis de Incentivo à Cultura.`);
    this.metaService.setTag('twitter:creator', '@author_handle');

    // Meta tags do Open Graph
    this.metaService.setTag('og:title', 'Incentivador: ' +  this.incentivador.nome);
    this.metaService.setTag('og:typle', 'article');
    this.metaService.setTag('og:locale', 'pt-BR');
    this.metaService.setTag('og:url', this.url);
    this.metaService.setTag('og:description', `Portal de Visualização do 
                                               Sistema de Apoio às 
                                               Leis de Incentivo à Cultura.`);
    this.metaService.setTag('site_name', 'VERSALIC');
    // this.metaService.setTag('fb:admins', ''); // usada apenas se tivermos uma página do facebook
  }
}
