import { Component, OnInit, AfterViewInit,
         trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Location } from '@angular/common';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { IMyOptions, IMyDateModel, IMyInputFieldChanged } from 'ngx-mydatepicker';

import { ApiService } from './../../services/api.service';
import { ConfigurationService } from './../../services/configuration.service';
import { DataFormatterService } from './../../services/data-formatter.service';

import { Projeto } from './../../models/projeto.model';
import { Proposta } from './../../models/proposta.model';
import { Proponente } from './../../models/proponente.model';
import { Incentivador } from './../../models/incentivador.model';
import { Fornecedor } from './../../models/fornecedor.model';
import { Segmentos } from './../../models/segmentos.model';
import { Estados } from './../../models/estados.model';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  // Variáveis locais
  pesquisaPor = 'projetos';
  buscaAvancada = false;
  totalProjetos = 0;
  totalPropostas = 0;
  totalProponentes = 0;
  totalIncentivadores = 0;
  totalFornecedores = 0;

  // Configurações de Calendário
  private opcoesCalendario: IMyOptions = {
      dateFormat: 'dd/mm/yyyy',
      todayBtnTxt: 'Hoje',
      firstDayOfWeek: 'su',
      sunHighlight: false,
      ariaLabelPrevMonth: 'Mês anterior.',
      ariaLabelNextMonth: 'Próximo mês.',
      ariaLabelPrevYear: 'Próximo ano.',
      ariaLabelNextYear: 'Próximo ano.',
      dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sáb'},
      monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' }
  };
  private opcoesCalendario2: IMyOptions = {
      dateFormat: 'dd/mm/yyyy',
      todayBtnTxt: 'Hoje',
      firstDayOfWeek: 'su',
      sunHighlight: false,
      alignSelectorRight: true,
      ariaLabelPrevMonth: 'Mês anterior.',
      ariaLabelNextMonth: 'Próximo mês.',
      ariaLabelPrevYear: 'Próximo ano.',
      ariaLabelNextYear: 'Próximo ano.',
      dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sáb'},
      monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' }
  };
  public dataInicioProjeto: { date: { year: Number , month: Number, day: Number }} = null;
  public dataTerminoProjeto: { date: { year: Number , month: Number, day: Number }} = null;
  public dataInicioProposta: { date: { year: Number , month: Number, day: Number }} = null;
  public dataTerminoProposta: { date: { year: Number , month: Number, day: Number }} = null;

  dataInicioProjetoValida = true;
  dataTerminoProjetoValida = true;
  dataInicioPropostaValida = true;
  dataTerminoPropostaValida = true;

  // Opções de Ordenação
  ordenarPor = 'PRONAC';
  ordenarDesc = false;
  ordenarPorQueries:  { [query: string]: String; } = {}
  queriesDeOrdemDeProjetos: { [query: string]: String }
                          = { 'PRONAC':           'PRONAC',
                              'ano_projeto':      'Ano do Projeto',
                              'data_inicio':      'Data de Início',
                              'data_termino':     'Data de Término',
                              'valor_solicitado': 'Valor Solicidado',
                              'outras_fontes':    'Outras Fontes',
                              'valor_captado':    'Valor Captado',
                              'valor_proposta':   'Valor da Proposta',
                              'valor_projeto':    'Valor do Projeto' };
  queriesDeOrdemDePropostas: { [query: string]: String } = {};
  queriesDeOrdemDeProponentes: { [query: string]: String }
                             = { 'total_captado': 'Total Captado',
                                 'cgccpf':        'CGCCPF (FALTA NA API)' };
  queriesDeOrdemDeIncentivadores: { [query: string]: String }
                                = { 'total_doado': 'Total Doado',
                                    'cgccpf':        'CGCCPF (FALTA NA API)' };
  queriesDeOrdemDeFornecedores: { [query: string]: String } = {};

  // Queries para a busca
  queries: { [query: string]: String } = {};
  queriesDoSelecionado = [];
  queriesDeProjetos: { [query: string]: String }
                    = { 'limit': '', 'offset': '', 'PRONAC': '', 'proponente': '', 'cgccpf': '',
                        'nome': '', 'area': '', 'segmento': '', 'UF': '', 'ano_projeto': '', 'sort': 'PRONAC',
                        'data_inicio': '', 'data_inicio_min': '', 'data_inicio_max': '',
                        'data_termino': '', 'data_termino_min': '', 'data_termino_max': '' };
  queriesDePropostas: { [query: string]: String }
                    = { 'limit': '', 'offset': '', 'nome': '', 'data_inicio': '', 'data_termino': '' };
  queriesDeProponentes: { [query: string]: String }
                      = { 'limit': '', 'offset': '', 'nome': '', 'cgccpf': '', 'url_id': '',
                           'municipio': '', 'UF': '', 'tipo_pessoa': '', 'sort': '' };
  queriesDeIncentivadores: { [query: string]: String }
                         = { 'limit': '', 'offset': '', 'nome': '', 'cgccpf': '', 'municipio': '',
                              'UF': '', 'tipo_pessoa': '', 'PRONAC': '', 'sort': 'total_doado' };
  queriesDeFornecedores: { [query: string]: String }
                       = { 'limit': '', 'offset': '', 'nome': '', 'cgccpf': '', 'PRONAC': '' };

  // Dropdowns e selects
  areasDeProjetos = ['Todas as áreas', 'Artes Cênicas',
                     'Audiovisual', 'Música',
                     'Artes Visuais', 'Patrimônio Cultural',
                     'Humanidades', 'Artes Integradas'];
  segmentosDeProjetos = new Segmentos();
  estados = new Estados();
  tiposPessoa = ['Qualquer tipo', 'Física', 'Jurídica'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private apiService: ApiService,
              private configurationService: ConfigurationService,
              private dataFormatterService: DataFormatterService) {
              }

  ngOnInit() {
    this.queriesDoSelecionado = Object.keys(this.queriesDeProjetos);
    this.ordenarPorQueries = this.queriesDeOrdemDeProjetos;

    // Atualizar estatísticas.
    this.obterEstatisticas();

    this.dataTerminoProjetoValida = true;
    this.dataInicioProjetoValida = true;
    this.dataTerminoPropostaValida = true;
    this.dataInicioPropostaValida = true;

  }

  atualizaQueries(queryParams: any) {

    this.queries = {};
    this.ordenarPor = '';

    for (const query of this.queriesDoSelecionado) {
      if (queryParams[query]) {

        this.queries[query] = queryParams[query];

        switch (this.pesquisaPor) {
          case 'projetos':
            this.queriesDeProjetos = this.queries;
            this.ordenarPorQueries = this.queriesDeOrdemDeProjetos;

            if (this.ordenarPor === '') {
              this.ordenarPor = 'PRONAC';
            }
          break;
          case 'propostas':
            this.queriesDePropostas = this.queries;
            this.ordenarPorQueries = this.queriesDeOrdemDePropostas;
          break;
          case 'proponentes':
            this.queriesDeProponentes = this.queries;
            this.ordenarPorQueries = this.queriesDeOrdemDeProponentes;

            if (this.ordenarPor === '') {
              this.ordenarPor = 'total_captado';
            }
          break;
          case 'incentivadores':
            this.queriesDeIncentivadores = this.queries;
            this.ordenarPorQueries = this.queriesDeOrdemDeIncentivadores;
            if (this.ordenarPor === '') {
              this.ordenarDesc = true;
              this.ordenarPor = 'total_doado';
            }
          break;
          case 'fornecedores':
            this.queriesDeFornecedores = this.queries;
            this.ordenarPorQueries = this.queriesDeOrdemDeFornecedores;
          break;
        }

        if (query === 'sort') {
          this.ordenarPor = this.queries['sort'].split(':')[0];
          this.ordenarDesc = this.queries['sort'].split(':')[1] === 'desc' ? false : true;
        }
      }
    }

  }

  onTrocaPesquisaPor(novoPesquisaPor) {

    this.pesquisaPor = novoPesquisaPor;

    switch (this.pesquisaPor) {
      case 'projetos':
        this.ordenarPorQueries = this.queriesDeOrdemDeProjetos;
        this.queries = this.queriesDeProjetos;
        this.queriesDoSelecionado = Object.keys(this.queriesDeProjetos);
      break;
      case 'propostas':
      this.ordenarPorQueries = this.queriesDeOrdemDePropostas;
        this.queries = this.queriesDeProjetos;
        this.queriesDoSelecionado = Object.keys(this.queriesDePropostas);
      break;
      case 'proponentes':
      this.ordenarPorQueries = this.queriesDeOrdemDeProponentes;
        this.queries = this.queriesDeProponentes;
        this.queriesDoSelecionado = Object.keys(this.queriesDeProponentes);
      break;
      case 'incentivadores':
      this.ordenarPorQueries = this.queriesDeOrdemDeIncentivadores;
        this.queries = this.queriesDeIncentivadores;
        this.queriesDoSelecionado = Object.keys(this.queriesDeIncentivadores);
      break;
      case 'fornecedores':
      this.ordenarPorQueries = this.queriesDeOrdemDeFornecedores;
        this.queries = this.queriesDeFornecedores;
        this.queriesDoSelecionado = Object.keys(this.queriesDeIncentivadores);
      break;
      default:
        this.router.navigate(['falha', 405]);
    }

    this.atualizaQueries(this.queries);
  }

  onRealizarBuscaComEnter(event) {
    if (event.keyCode === 13) { this.onRealizarBusca(); }
  }

  consoleLog(str: String) {
    console.log(str);
  }

  onRealizarBusca() {

    // Adiciona queries extras
    this.queries['limit'] = '' + this.configurationService.limitResultados;
    this.queries['offset'] = '0';

    /*if (this.keys(this.ordenarPorQueries).length > 0) {
      this.ordenarDesc ? (this.queries['sort'] = this.ordenarPor + ':desc') : (this.queries['sort'] = this.ordenarPor + ':asc');
    }*/
    console.log(this.queries);

    switch (this.pesquisaPor) {

      case 'projetos':
        this.router.navigate(['/projetos'], {queryParams: this.queries});
      break;

      case 'propostas':
        this.router.navigate(['/propostas'], {queryParams: this.queries});
      break;

      case 'proponentes':
        this.router.navigate(['/proponentes'], {queryParams: this.queries});
      break;

      case 'incentivadores':
        this.router.navigate(['/incentivadores'], {queryParams: this.queries});
      break;

      case 'fornecedores':
        this.router.navigate(['/fornecedores'], {queryParams: this.queries});
      break;

      default:
        this.router.navigate(['falha', 405]);
    }
  }

  // Remove uma querie de parâmetro de busca
  removeQuery(removedKey: string) {
    this.queries[removedKey] = null;

    this.atualizaQueries(this.queries);

  }

  // Retorna o dicionário de Queries como um array iterável para a view
  keys(dicionario: { [query: string]: String; }): Array<string> {
    return Object.keys(dicionario);
  }

  // Obter estatísticas exibidas na sessão dados pela API
  obterEstatisticas() {

    this.apiService.getTotalProjetos().subscribe(
      resposta => { this.totalProjetos = resposta.total; },
      err => { this.totalProjetos = 0; }
    );

    this.apiService.getTotalPropostas().subscribe(
      resposta => { this.totalPropostas = resposta.total; },
      err => { this.totalPropostas = 0; }
    );

    this.apiService.getTotalProponentes().subscribe(
      resposta => { this.totalProponentes = resposta.total; },
      err => { this.totalProponentes = 0; }
    );

    this.apiService.getTotalIncentivadores().subscribe(
      resposta => { this.totalIncentivadores = resposta.total; },
      err => { this.totalIncentivadores = 0; }
    );

    this.apiService.getTotalFornecedores().subscribe(
      resposta => { this.totalFornecedores = resposta.total; },
      err => { this.totalFornecedores = 0; }
    );
  }

  mudarEstadoPorSelect($event) {
    if ($event.target.value === '' || $event.target.value === 'Todos os estados') {
      this.queries['UF'] = null;
    } else {
      this.queries['UF'] = $event.target.value;
    }
  }

  mudarSegmentoPorSelect($event) {
    $event.target.value !== 'null' ? this.queries['segmento'] = $event.target.value : this.queries['segmento'] = null;
    $event.target.value !== 'null' ? this.queries['area'] = this.segmentosDeProjetos.obterAreaCodPorCod($event.target.value): this.queries['segmento'] = null;
  }

  mudarAreaPorSelect($event) {
    $event.target.value > 0 ? this.queries['area'] = $event.target.value : this.queries['area'] = null;
    if (this.queries['segmento'] !== null && this.queries['segmento'] !== undefined && this.queries['area'] !== null && this.queries['area'] != this.segmentosDeProjetos.obterAreaCodPorCod(this.queries['segmento'])) {
      this.queries['segmento'] = null;
     }
  }

  mudarTipoPessoaPorSelect($event) {
    if ($event.target.value !== null && $event.target.value !== '' && $event.target.value !== 'Qualquer tipo') {
      $event.target.value === 'fisica' ? this.queries['tipo_pessoa'] = 'fisica' : this.queries['tipo_pessoa'] = 'juridica';
    } else {
      this.queries['tipo_pessoa'] = null;
    }
  }

  public onObterDataInicioProjeto(event: IMyDateModel): void {
    if (event.jsdate === null) {
       this.queries['data_inicio_min'] = null;
    } else {
      this.queries['data_inicio_min'] = event.date.year + '-' + event.date.month + '-' + event.date.day;
    }
  }

  public onObterDataInicioProposta(event: IMyDateModel): void {
    if (event.jsdate === null) {
       this.queries['data_inicio_min'] = null;
    } else {
      this.queries['data_inicio_min'] = event.date.year + '-' + event.date.month + '-' + event.date.day;
    }
  }

  public onObterDataTerminoProjeto(event: IMyDateModel): void {
    if (event.jsdate === null) {
       this.queries['data_termino_max'] = null;
    } else {
      this.queries['data_termino_max'] = event.date.year + '-' + event.date.month + '-' + event.date.day;
    }
  }

  public onObterDataTerminoProposta(event: IMyDateModel): void {
    if (event.jsdate === null) {
       this.queries['data_termino_max'] = null;
    } else {
      this.queries['data_termino_max'] = event.date.year + '-' + event.date.month + '-' + event.date.day;
    }
  }

  atualizaInputsDeData() {
    if (this.queries['data_inicio_min'] && this.pesquisaPor === 'projetos') {

      const dataSplit = this.queries['data_inicio_min'].split('-');

      if (dataSplit.length === 3) {
        this.dataInicioProjeto = {
          date: { year: Number(dataSplit[0]),
                  month: Number(dataSplit[1]),
                  day: Number(dataSplit[2]) }
                };
      }

    }
    if (this.queries['data_termino_max'] && this.pesquisaPor === 'projetos') {

      const dataSplit = this.queries['data_termino_max'].split('-');
      console.log(dataSplit);
      this.dataTerminoProjeto = {
          date: { year: Number(dataSplit[0]),
                  month: Number(dataSplit[1]),
                  day: Number(dataSplit[2]) }
                };

    }
    if (this.queries['data_inicio_min'] && this.pesquisaPor === 'propostas') {

      const dataSplit = this.queries['data_inicio_min'].split('-');

      if (dataSplit.length === 3) {
        this.dataInicioProposta = {
          date: { year: Number(dataSplit[0]),
                  month: Number(dataSplit[1]),
                  day: Number(dataSplit[2]) }
                };
      }

    }
    if (this.queries['data_termino_max'] && this.pesquisaPor === 'propostas') {

      const dataSplit = this.queries['data_termino_max'].split('-');
      console.log(dataSplit);
      this.dataTerminoProposta = {
          date: { year: Number(dataSplit[0]),
                  month: Number(dataSplit[1]),
                  day: Number(dataSplit[2]) }
                };

    }
  }

  // Aqui é configurado o botão de deslizamento das abas de pesquisa
  ngAfterViewInit() {

    const scrollBarWidths = 40;

    function widthOfList() {

      let itemsWidth = 0;

      $('.aba li').each(function(){
        const itemWidth = $(this).outerWidth();
        itemsWidth += itemWidth;
      });

      return itemsWidth;
    };

    function widthOfHidden() {
      return (($('.abas-pesquisa').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths;
    };

    function getLeftPosi() {
      return $('.aba').position().left;
    };

    function reAdjust() {
      if (($('.abas-pesquisa').outerWidth()) < widthOfList()) {
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

    reAdjust();

    $(window).on('resize', function(e){
      if ($('#container-dados').length > 0) {
        reAdjust();
      }
    });

    $('.scroller-right').click(function() {

      $('.scroller-left').fadeIn('slow');
      $('.scroller-right').fadeOut('slow');

      $('.aba').animate({left: '+=' + widthOfHidden() + 'px'}, 'slow', function(){

      });
    });

    $('.scroller-left').click(function() {

      $('.scroller-right').fadeIn('slow');
      $('.scroller-left').fadeOut('slow');

      $('.aba').animate({ left: '-=' + getLeftPosi() + 'px'}, 'slow', function(){

      });
    });
  }

}
