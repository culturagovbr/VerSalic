import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

   public ApiUrl: String = 'http://api.salic.cultura.gov.br/v1/';
   public limitResultados = 12;
}
