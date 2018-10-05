import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, CanDeactivate, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { MetaService } from '@ngx-meta/core';
import { ApiService } from './../../services/api.service';
import { DataFormatterService } from './../../services/data-formatter.service';
import { ConfigurationService } from './../../services/configuration.service';

import { Projeto } from './../../models/projeto.model';

declare var $: any;

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit, OnDestroy, AfterViewInit {

  // Modais de vetores
  @ViewChild('modalDeDistribuicao') public modalDeDistribuicao: ModalDirective;
  @ViewChild('modalDeDivulgacao') public modalDeDivulgacao: ModalDirective;
  @ViewChild('modalDeDocumentosAnexos') public modalDeDocumentosAnexos: ModalDirective;
  @ViewChild('modalDeMarcasAnexas') public modalDeMarcasAnexas: ModalDirective;
  @ViewChild('modalDeDeslocamentos') public modalDeDeslocamentos: ModalDirective;
  @ViewChild('modalDeProrrogacao') public modalDeProrrogacao: ModalDirective;
  @ViewChild('modalDeRelatorioFisico') public modalDeRelatorioFisico: ModalDirective;
  @ViewChild('modalDeCertidoesNegativas') public modalDeCertidoesNegativas: ModalDirective;
  @ViewChild('modalDeCaptacoes') public modalDeCaptacoes: ModalDirective;
  @ViewChild('modalDeRelacaoPagamentos') public modalDeRelacaoPagamentos: ModalDirective;
  @ViewChild('modalDeReadequacoes') public modalDeReadequacoes: ModalDirective;
  @ViewChild('modalDeRelacaoBensCapital') public modalDeRelacaoBensCapital;

  // Variáveis locais
  PRONAC: Number;
  inscricao: Subscription; // Usada para observar mudanças na URL
  projeto: Projeto;
  carregandoDados: Boolean = true;
  JSON: any = JSON;
  url: string = location.href;

  // Dados utilizados na view
  textoSelecionado = 'resumo';
  isProvidenciasEscondido = true;
  relacaoPagamentosCarregadas = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private dataFormatterService: DataFormatterService,
              private metaService: MetaService,
              private configurationService: ConfigurationService) {
  }

  ngOnInit() {
    // Obtêm o parâmetro através da rota da URL
   this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.PRONAC = params['PRONAC'];
        this.onLoadProjeto(this.PRONAC);
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

  consoleLog(str: string) {
    console.log(str);
  }

  onLoadProjeto(PRONAC: Number) {
    this.carregandoDados = true;

    this.apiService.getProjeto(String(PRONAC)).subscribe(
      projeto => {
        console.log(projeto);
        this.projeto = projeto;
        this.atualizarMetaTags();
      },
      err => {
        this.carregandoDados = false;
        this.router.navigate(['falha', err]);
      },
      () => this.carregandoDados = false);
  }

  // Rotinas dos modais de vetores
  public mostrarModalDeDistribuicao() {
    this.modalDeDistribuicao.show();
  }
  public esconderModalDeDistribuicao(): void {
    this.modalDeDistribuicao.hide();
  }

  public mostrarModalDeDivulgacao() {
    this.modalDeDivulgacao.show();
  }
  public esconderModalDeDivulgacao(): void {
    this.modalDeDivulgacao.hide();
  }

  public mostrarModalDeDocumentosAnexos() {
    this.modalDeDocumentosAnexos.show();
  }
  public esconderModalDeDocumentosAnexos(): void {
    this.modalDeDocumentosAnexos.hide();
  }

  public mostrarModalDeMarcasAnexas() {
    this.modalDeMarcasAnexas.show();
  }
  public esconderModalDeMarcasAnexas(): void {
    this.modalDeMarcasAnexas.hide();
  }

  public mostrarModalDeDeslocamentos() {
    this.modalDeDeslocamentos.show();
  }
  public esconderModalDeDeslocamentos(): void {
    this.modalDeDeslocamentos.hide();
  }

  public mostrarModalDeProrrogacao() {
    this.modalDeProrrogacao.show();
  }
  public esconderModalDeProrrogacao(): void {
    this.modalDeProrrogacao.hide();
  }

  public mostrarModalDeRelatorioFisico() {
    this.modalDeRelatorioFisico.show();
  }
  public esconderModalDeRelatorioFisico(): void {
    this.modalDeRelatorioFisico.hide();
  }

  public mostrarModalDeCertidoesNegativas() {
    this.modalDeCertidoesNegativas.show();
  }
  public esconderModalDeCertidoesNegativas(): void {
    this.modalDeCertidoesNegativas.hide();
  }

  public mostrarModalDeCaptacoes() {
    this.modalDeCaptacoes.show();
  }
  public esconderModalDeCaptacoes(): void {
    this.modalDeCaptacoes.hide();
  }

  public mostrarModalDeRelacaoPagamentos() {
    this.modalDeRelacaoPagamentos.show();
  }
  public esconderModalDeRelacaoPagamentos(): void {
    this.relacaoPagamentosCarregadas = 0;
    this.modalDeRelacaoPagamentos.hide();
  }

  public mostrarModalDeReadequacoes() {
    this.modalDeReadequacoes.show();
  }
  public esconderModalDeReadequacoes(): void {
    this.modalDeReadequacoes.hide();
  }

  public mostrarModalDeRelacaoBensCapital() {
    this.modalDeRelacaoBensCapital.show();
  }
  public esconderModalDeRelacaoBensCapital(): void {
    this.modalDeRelacaoBensCapital.hide();
  }

  // Utilizado pelo Guard de Rotas (can-deactivate-guard.service) quando é feita uma troca de página.
  public esconderTodosOsModais(): void {
    if (this.modalDeDistribuicao !== undefined) { this.modalDeDistribuicao.hide(); }
    if (this.modalDeDivulgacao !== undefined) { this.modalDeDivulgacao.hide(); }
    if (this.modalDeDocumentosAnexos !== undefined) { this.modalDeDocumentosAnexos.hide(); }
    if (this.modalDeMarcasAnexas !== undefined) { this.modalDeMarcasAnexas.hide(); }
    if (this.modalDeDeslocamentos !== undefined) { this.modalDeDeslocamentos.hide(); }
    if (this.modalDeProrrogacao !== undefined) { this.modalDeProrrogacao.hide(); }
    if (this.modalDeRelatorioFisico !== undefined) { this.modalDeRelatorioFisico.hide(); }
    if (this.modalDeCertidoesNegativas !== undefined) { this.modalDeCertidoesNegativas.hide(); }
    if (this.modalDeCaptacoes !== undefined) { this.modalDeCaptacoes.hide(); }
    if (this.modalDeRelacaoPagamentos !== undefined) { this.modalDeRelacaoPagamentos.hide(); this.relacaoPagamentosCarregadas = 0; }
    if (this.modalDeReadequacoes !== undefined) { this.modalDeReadequacoes.hide(); }
    if (this.modalDeRelacaoBensCapital !== undefined) { this.modalDeRelacaoBensCapital.hide(); }
  }

  // Obtem o tamanho de vetores internos do Projeto.
  obterLength(nome: string) {
    return (<any>this.projeto._embedded[nome]).length;
  }

  public incrementarRelacaoPagamentos() {
    this.relacaoPagamentosCarregadas = this.relacaoPagamentosCarregadas + 20;
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {

    // Aqui é configurado o botão de deslizamento das abas de pesquisa
    const scrollBarWidths = 16;

    function widthOfList() {

      let itemsWidth = 0;

      $('.aba li').each(function(){
        const itemWidth = $(this).outerWidth();
        itemsWidth += itemWidth;
      });

      return itemsWidth;
    };

    function widthOfHidden() {
      return (($('.abas-texto').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths;
    };

    function getLeftPosi() {
      return $('.aba').position().left;
    };

    function getScrollPosi() {
      return $('.abas-texto').scrollLeft();
    };

    function reAjustar() {
      if (($('.abas-texto').outerWidth()) < widthOfList()) {
        $('.scroller-right').show();
      } else {
        $('.scroller-right').hide();
      }

      if (getLeftPosi() < 0) {
        $('.scroller-left').show();
      } else {
        $('.item').animate({left: '-=' + getLeftPosi() + 'px'}, 'slow');
        $('.scroller-left').hide();
      }

    }

    reAjustar();

    $(window).on('resize', function(e){
      if ($('#titulo-proposta').length > 0) {
        reAjustar();
      }
    });

    $('.abas-texto').scroll(function() {

      if (getScrollPosi() > 0) {
        $('.scroller-left').show();
      } else {
        $('.scroller-left').hide();
      }

      if (getScrollPosi() < widthOfList() - $('.abas-texto').outerWidth() ) {
        $('.scroller-right').show();
      } else {
        $('.scroller-right').hide();
      }
    });

    $('.scroller-right').click(function() {

      $('.scroller-left').fadeIn('slow');
      if (widthOfHidden() > 0) {
        $('.scroller-right').fadeOut('slow');
      }

      if (-1*widthOfHidden() > $('.abas-texto').outerWidth()) {
        $('.aba').animate({left: '-=' + ($('.abas-texto').outerWidth() - 30) + 'px'}, 'normal', function(){ });
      } else {
        $('.aba').animate({left: '+=' + widthOfHidden() + 'px'}, 'normal', function(){ });
        $('.scroller-right').fadeOut('slow');
      }
    });

    $('.scroller-left').click(function() {

      $('.scroller-right').fadeIn('slow');
      $('.scroller-left').fadeOut('slow');

      $('.aba').animate({ left: '-=' + getLeftPosi() + 'px'}, 'slow', function(){

      });
    });

  }

  atualizarMetaTags() {

    // Meta tags genéricas
    this.metaService.setTitle('Projeto: ' +  this.projeto.nome);
    this.metaService.setTag('description', `Portal de Visualização do 
                                               Sistema de Apoio às 
                                               Leis de Incentivo à Cultura.`);
    // Meta tags do Twitter
    this.metaService.setTag('twitter:card', 'summary');
    this.metaService.setTag('twitter:site', '@publisher_handle');
    this.metaService.setTag('twitter:title', 'Projeto: ' +  this.projeto.nome);
    this.metaService.setTag('twitter:description', `Portal de Visualização do 
                                               Sistema de Apoio às 
                                               Leis de Incentivo à Cultura.`);
    this.metaService.setTag('twitter:creator', '@author_handle');

    // Meta tags do Open Graph
    this.metaService.setTag('og:title', 'Projeto: ' +  this.projeto.nome);
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
