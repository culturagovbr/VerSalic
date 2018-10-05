import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MetaService } from '@ngx-meta/core';
import { ApiService } from './../../services/api.service';
import { DataFormatterService } from './../../services/data-formatter.service';
import { ConfigurationService } from './../../services/configuration.service';

import { Fornecedor } from './../../models/fornecedor.model';
import { Produto } from './../../models/produto.model';

declare var $: any;

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit, OnDestroy {

  inscricao: Subscription; // Usada para observar mudanças na URL
  JSON: any = JSON;
  url: string = location.href;

  carregandoDados: boolean = false;
  carregandoDadosProdutos: boolean = false;
  buscaPorProdutosSemResultados: boolean = false;

  queriesDeProdutos: { [query: string]: String; } = {};
  idFornecedor: String;
  fornecedor: Fornecedor;
  listaProdutos: [Produto];
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
        this.idFornecedor = params['idFornecedor'];
        this.onLoadFornecedor(this.idFornecedor);
        this.onLoadProdutos(this.idFornecedor, this.paginaAtual);
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

  onLoadFornecedor(idFornecedor: String) {
    this.carregandoDados = true;
     this.listaProdutos = undefined; // Garante que o objeto seja sobrescrito
                                    // caso estejamos voltando de outra página.

    this.apiService.getFornecedor(idFornecedor).subscribe(
      fornecedor => {
        console.log(fornecedor);
        this.fornecedor = fornecedor;
        this.atualizarMetaTags();
      },
      err => {
        this.carregandoDados = false;
        this.router.navigate(['falha', err]);
      },
      () => this.carregandoDados = false);
  }

  onLoadProdutos(idFornecedor: String, index: number) {
    this.carregandoDadosProdutos = true;
    this.buscaPorProdutosSemResultados = false;

    this.queriesDeProdutos['limit'] = '' + this.configurationService.limitResultados;
    this.queriesDeProdutos['offset'] = (index - 1) * this.configurationService.limitResultados + '';
    this.offsetAtual = this.queriesDeProdutos['offset'];

    this.apiService.getListaProdutosDoFornecedor(idFornecedor, this.queriesDeProdutos).subscribe(
      resposta => {
        console.log(resposta);
        this.listaProdutos = resposta.listaProdutosDoFornecedor;

        this.numeroDeItens = resposta.count;
        this.totalDeItens = resposta.total;
        this.totalDeItensCarregado += this.numeroDeItens;
        window.scrollTo(0, 0);
      },
      err => {
        this.carregandoDadosProdutos = false;

        if (err === 404) {
          this.buscaPorProdutosSemResultados = true;
        } else {
          this.router.navigate(['falha', err]);
        }
      },
      () => this.carregandoDadosProdutos = false);
  }

  obterStringDeQuantidadeNaResposta() {
    return (Number(this.offsetAtual) + 1) + ' a ' + (Number(this.offsetAtual) + Number(this.numeroDeItens));
  }

  compartilharTelegram() {
    window.open('https://t.me/share/url?url=' + encodeURIComponent(window.location.href), '_blank');
  }

  atualizarMetaTags() {
    // Meta tags genéricas
    this.metaService.setTitle('Fornecedor: ' +  this.fornecedor.nome);
    this.metaService.setTag('description', `Portal de Visualização do 
                                            Sistema de Apoio às 
                                            Leis de Incentivo à Cultura.`);
    // Meta tags do Twitter
    this.metaService.setTag('twitter:card', 'summary');
    this.metaService.setTag('twitter:site', '@publisher_handle');
    this.metaService.setTag('twitter:title', 'Fornecedor: ' +  this.fornecedor.nome);
    this.metaService.setTag('twitter:description', `Portal de Visualização do 
                                                    Sistema de Apoio às 
                                                    Leis de Incentivo à Cultura.`);
    this.metaService.setTag('twitter:creator', '@author_handle');

    // Meta tags do Open Graph
    this.metaService.setTag('og:title', 'Fornecedor: ' +  this.fornecedor.nome);
    this.metaService.setTag('og:typle', 'article');
    this.metaService.setTag('og:locale', 'pt-BR');
    this.metaService.setTag('og:url', this.url);
    this.metaService.setTag('og:description', `Portal de Visualização do 
                                               Sistema de Apoio às 
                                               Leis de Incentivo à Cultura.`);
    this.metaService.setTag('site_name', 'VERSALIC');
    //this.metaService.setTag('fb:admins', ''); // usada apenas se tivermos uma página do facebook
  }
}
