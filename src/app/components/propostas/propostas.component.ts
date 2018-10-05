import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MetaService } from '@ngx-meta/core';
import { ApiService } from './../../services/api.service';
import { DataFormatterService } from './../../services/data-formatter.service';
import { ConfigurationService } from './../../services/configuration.service';

import { Proposta } from './../../models/proposta.model';

declare var $: any;

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.scss']
})
export class PropostasComponent implements OnInit, OnDestroy, AfterViewInit {

  idProposta: Number;
  inscricao: Subscription; // Usada para observar mudanças na URL
  JSON: any = JSON;
  url: string = location.href;
  carregandoDados: Boolean = false;
  proposta: Proposta;

  // Dados utilizados na view
  textoSelecionado = 'resumo';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private dataFormatterService: DataFormatterService,
              private metaService: MetaService,
              public configurationService: ConfigurationService) { }

  ngOnInit() {
   // Obtêm o parâmetro através da rota da URL
   this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idProposta = params['idProposta'];
        this.onLoadProposta(this.idProposta);
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

  onLoadProposta(idProposta: Number) {
    this.carregandoDados = true;

    this.apiService.getProposta(String(idProposta)).subscribe(
      proposta => {
        console.log(proposta);
        this.proposta = proposta;
        this.atualizarMetaTags();
      },
      err => {
        this.carregandoDados = false;
        this.router.navigate(['falha', err]);
      },
      () => this.carregandoDados = false);
  }

  compartilharTelegram() {
    window.open('https://t.me/share/url?url=' + encodeURIComponent(window.location.href), '_blank');
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

    function reAjustarProposta() {
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

    reAjustarProposta();

    $(window).on('resize', function(e){
      if ($('#titulo-proposta').length > 0) {
        reAjustarProposta();
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
    this.metaService.setTitle('Proposta: ' +  this.proposta.nome);
    this.metaService.setTag('description', `Portal de Visualização do 
                                            Sistema de Apoio às 
                                            Leis de Incentivo à Cultura.`);
    // Meta tags do Twitter
    this.metaService.setTag('twitter:card', 'summary');
    this.metaService.setTag('twitter:site', '@publisher_handle');
    this.metaService.setTag('twitter:title', 'Proposta: ' +  this.proposta.nome);
    this.metaService.setTag('twitter:description', `Portal de Visualização do 
                                                    Sistema de Apoio às 
                                                    Leis de Incentivo à Cultura.`);
    this.metaService.setTag('twitter:creator', '@author_handle');

    // Meta tags do Open Graph
    this.metaService.setTag('og:title', 'Proposta: ' +  this.proposta.nome);
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
