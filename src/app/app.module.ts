import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouteReuseStrategy } from '@angular/router';
import { DatePipe } from '@angular/common';

// Modules de terceiros
import { ShareButtonsModule, ShareButtonsOptions } from 'ngx-sharebuttons';
import { MetaModule,  MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { AlertModule, BsDropdownModule, ButtonsModule, CollapseModule, PaginationModule, PopoverModule, ModalModule } from 'ngx-bootstrap/';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CountoModule } from 'angular2-counto';
import { NgSpinKitModule } from 'ng-spin-kit';

// Components do App
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BuscaComponent } from './components/busca/busca.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { PropostasComponent } from './components/propostas/propostas.component';
import { ProponentesComponent } from './components/proponentes/proponentes.component';
import { IncentivadoresComponent } from './components/incentivadores/incentivadores.component';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { FalhaComponent } from './components/falha/falha.component';
import { SobreComponent } from './components/sobre/sobre.component';

// Services do App
import { ApiService } from './services/api.service';
import { ConfigurationService } from './services/configuration.service';
import { DataFormatterService } from './services/data-formatter.service';
import { PaginationService } from './services/pagination.service';

// Outros
import { AppRoutingModule } from './modules/app.rounting.module';
import { CustomReuseStrategy } from './services/route-reuse.strategy';
import { NgxMyDatePickerConfig } from 'ngx-mydatepicker/dist/services/ngx-my-date-picker.config';

@Pipe({name: 'numero'})
export class NumeroPipe implements PipeTransform {
  transform(value: number, args: string[]): any {
    value = Math.round(value);
    return value.toLocaleString();
  }
}

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'VERSALIC',
    defaults: {
      title: 'VERSALIC',
      description: `Portal de Visualização do 
                    Sistema de Apoio às 
                    Leis de Incentivo à Cultura.`,
      'og:type': 'website',
      'og:locale': 'pt-BR'
    }
  });
}

const shareOptions: ShareButtonsOptions = {
  include: ['facebook', 'twitter', 'linkedin', 'google', 'reddit', 'whatsapp', 'telegram', 'email', 'copy'],
  exclude: ['tumblr', 'stumble', 'vk', 'tumblr', 'pinterest'],
  description: 'VERSALIC - Portal de Visualização do Sistema de Apoio às Leis de Incentivo à Cultura.',
  theme: 'versalic'
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscaComponent,
    ProjetosComponent,
    PropostasComponent,
    ProponentesComponent,
    IncentivadoresComponent,
    FornecedoresComponent,
    FalhaComponent,
    SobreComponent,
    NumeroPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgSpinKitModule,
    BrowserAnimationsModule,
    ShareButtonsModule.forRoot(shareOptions),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    }),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    NgxMyDatePickerModule,
    CountoModule
  ],
  providers: [ 
    ApiService,
    ConfigurationService,
    DataFormatterService,
    PaginationService,
    DatePipe,
    NgxMyDatePickerConfig,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
