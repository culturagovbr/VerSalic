import { Fornecedor } from './../models/fornecedor.model';
import { Incentivador } from './../models/incentivador.model';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { BuscaComponent } from './../components/busca/busca.component';
import { ProjetosComponent } from '../components/projetos/projetos.component';
import { PropostasComponent } from '../components/propostas/propostas.component';
import { ProponentesComponent } from '../components/proponentes/proponentes.component';
import { IncentivadoresComponent } from '../components/incentivadores/incentivadores.component';
import { FornecedoresComponent } from '../components/fornecedores/fornecedores.component';
import { FalhaComponent } from '../components/falha/falha.component';
import { SobreComponent } from './../components/sobre/sobre.component';

import { CanDeactivateGuard } from './../services/can-deactivate-guard.service';

const appRoutes: Routes = [
  {
    path: 'projetos/:PRONAC',
    component: ProjetosComponent,
    data: {
      meta: {
        title: 'Página de Projeto',
        description: 'Página de Projeto - VERSALIC'
      }
    },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'propostas/:idProposta',
    component: PropostasComponent,
    data: {
      meta: {
        title: 'Página de Proposta',
        description: 'Página de Proposta - VERSALIC'
      }
    }
  },
  {
    path: 'proponentes/:idProponente',
    component: ProponentesComponent,
    data: {
      meta: {
        title: 'Página de Proponente',
        description: 'Página de Proponente - VERSALIC'
      }
    }
  },
  {
    path: 'incentivadores/:idIncentivador',
    component: IncentivadoresComponent,
    data: {
      meta: {
        title: 'Página de Incentivador',
        description: 'Página de Incentivador - VERSALIC'
      }
    }
  },
  {
    path: 'fornecedores/:idFornecedor',
    component: FornecedoresComponent,
    data: {
      meta: {
        title: 'Página de Fornecedor',
        description: 'Página de Fornecedor - VERSALIC'
      }
    }
  },
  {
    path: 'falha/:statusFalha',
    component: FalhaComponent
  },
  {
    path: 'sobre',
    component: SobreComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      meta: {
        title: 'Página Inicial',
        description: 'Página Inicial - VERSALIC'
      }
    }
  },
  {
    path: 'busca', redirectTo: '/projetos', pathMatch: 'full' },
  {
    path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: ':pesquisaPor',
    component: BuscaComponent,
    data: {
      meta: {
        title: 'Página de Pesquisa',
        description: 'Página de Pesquisa - VERSALIC'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class AppRoutingModule {}
