import { Injectable } from '@angular/core';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { ProjetosComponent } from './../components/projetos/projetos.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ProjetosComponent> {

  canDeactivate(
    component: ProjetosComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {

    component.esconderTodosOsModais();

    return true;
  }
}