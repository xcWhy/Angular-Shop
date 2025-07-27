import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
