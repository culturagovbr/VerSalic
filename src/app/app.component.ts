import { Component } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VERSALIC';
  
  public menuEscondido: Boolean = true;

  constructor(private metaService: MetaService) {}

  public escondido(event: any): void {
    // console.log(event);
  }

  public expandido(event: any): void {
    // console.log(event);
  }
}
