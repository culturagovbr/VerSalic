import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigurationService } from './configuration.service';

import { Projeto } from './../models/projeto.model';
import { Proposta } from './../models/proposta.model';
import { Proponente } from './../models/proponente.model';
import { Incentivador } from './../models/incentivador.model';
import { Fornecedor } from './../models/fornecedor.model';
import { Produto } from './../models/produto.model';
import { Doacao } from './../models/doacao.model';

@Injectable()
export class ApiService {

  constructor(private http: Http,
              private configuration: ConfigurationService) { }

  // Projeto
  getProjeto(pronac: String): Observable<Projeto> {
    return this.http.get(this.configuration.ApiUrl + 'projetos/' + pronac + '/')
      .map((res: Response) => res.json())
      .catch((error: any) => this.handleError(error));

  }

  // Projetos
  getListaProjetos(queries: { [query: string]: String; } ):
      Observable<{ listaProjetos: [Projeto], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'projetos/', { search: searchParams })
      .map((res: Response) => ({ listaProjetos: res.json()._embedded.projetos,
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
   }

  // Total Projetos
  getTotalProjetos():
      Observable<{ total: number }> {

    const queries: { [query: string]: String; } = {'limit': '1'};
    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'projetos/', { search: searchParams })
      .map((res: Response) => ({ total: res.json().total }))
      .catch((error: any) => this.handleError(error));
   }

  // Proposta
  getProposta(id: String): Observable<Proposta> {
    return this.http.get(this.configuration.ApiUrl + 'propostas/' + id + '/')
      .map((res: Response) => res.json())
      .catch((error: any) => this.handleError(error));
  }

  // Propostas
  getListaPropostas(queries: { [query: string]: String; } ):
      Observable<{ listaPropostas: [Proposta], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'propostas/', { search: searchParams })
      .map((res: Response) => ({ listaPropostas: res.json()._embedded.propostas,
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
  }

  // Total Prpostas
  getTotalPropostas():
      Observable<{ total: number }> {

    const queries: { [query: string]: String; } = {'limit': '1'};
    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'propostas/', { search: searchParams })
      .map((res: Response) => ({ total: res.json().total }))
      .catch((error: any) => this.handleError(error));
   }

  // Proponente
  getProponente(proponente_id: String): Observable<Proponente> {
    return this.http.get(this.configuration.ApiUrl + 'proponentes/' + proponente_id + '/')
      .map((res: Response) => res.json())
      .catch((error: any) => this.handleError(error));
  }

  // Proponentes
  getListaProponentes(queries: { [query: string]: String; } ):
      Observable<{ listaProponentes: [Proponente], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'proponentes/', { search: searchParams })
      .map((res: Response) => ({ listaProponentes: res.json()._embedded.proponentes,
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
  }

  // Total Proponentes
  getTotalProponentes():
      Observable<{ total: number }> {

    const queries: { [query: string]: String; } = {'limit': '1'};
    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'proponentes/', { search: searchParams })
      .map((res: Response) => ({ total: res.json().total }))
      .catch((error: any) => this.handleError(error));
   }

  // Projetos do Proponente
  getListaProjetosDoProponente(queries: { [query: string]: String; }):
      Observable<{ listaProjetosDoProponente: [Projeto], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'projetos/', { search: searchParams})
      .map((res: Response) => ({ listaProjetosDoProponente: res.json()._embedded.projetos,
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
  }

  // Incentivador
  getIncentivador(incentivador_id: String): Observable<Incentivador> {
    return this.http.get(this.configuration.ApiUrl + 'incentivadores/' + incentivador_id + '/')
      .map((res: Response) => res.json())
      .catch((error: any) => this.handleError(error));
  }

  // Incentivadores
  getListaIncentivadores(queries: { [query: string]: String; } ):
      Observable<{ listaIncentivadores: [Incentivador], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'incentivadores/', { search: searchParams })
      .map((res: Response) => ({ listaIncentivadores: res.json()._embedded.incentivadores,
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
  }

  // Total Incentivadores
  getTotalIncentivadores():
      Observable<{ total: number }> {

    const queries: { [query: string]: String; } = {'limit': '1'};
    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'incentivadores/', { search: searchParams })
      .map((res: Response) => ({ total: res.json().total }))
      .catch((error: any) => this.handleError(error));
   }

  // Doações do Incentivador
  getListaDoacoesDoIncentivador(incentivador_id: String, queries: { [query: string]: String; } ):
      Observable<{ listaDoacoesDoIncentivador: [Doacao], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'incentivadores/' + incentivador_id + '/doacoes/', { search: searchParams })
      .map((res: Response) => ({ listaDoacoesDoIncentivador: res.json()._embedded.doacoes,
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
  }

  // Fornecedor
  getFornecedor(fornecedor_id: String): Observable<Fornecedor> {
    return this.http.get(this.configuration.ApiUrl + 'fornecedores/' + fornecedor_id)
      .map((res: Response) => res.json())
      .catch((error: any) => this.handleError(error));
  }

  // Fornecedores
  getListaFornecedores(queries: { [query: string]: String; } ):
      Observable<{ listaFornecedores: [Fornecedor], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'fornecedores/', { search: searchParams })
      .map((res: Response) => ({ listaFornecedores: res.json()._embedded.fornecedores, 
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
  }

  // Total Projetos
  getTotalFornecedores():
      Observable<{ total: number }> {

    const queries: { [query: string]: String; } = {'limit': '1'};
    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'fornecedores/', { search: searchParams })
      .map((res: Response) => ({ total: res.json().total }))
      .catch((error: any) => this.handleError(error));
   }

  // Produtos do Fornecedor
  getListaProdutosDoFornecedor(fornecedor_id: String, queries: { [query: string]: String; } ):
      Observable<{ listaProdutosDoFornecedor: [Produto], count: number, total: number }> {

    const searchParams = this.serializeQueries(queries);

    return this.http.get(this.configuration.ApiUrl + 'fornecedores/' + fornecedor_id + '/produtos/', { search: searchParams })
      .map((res: Response) => ({ listaProdutosDoFornecedor: res.json()._embedded.produtos,
                                 count: res.json().count,
                                 total: res.json().total }))
      .catch((error: any) => this.handleError(error));
  }

  // Trata o casos de falha baseado no código de erro
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.status);
  }

  // Converte queries de uma hash de parâmetros em uma URLSearchParam
  private serializeQueries(obj: any): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            params.set(key, element);
        }
    }

    return params;
}

}
