import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `<a class="skip-link" href="#contenido">Saltar al contenido</a
    ><app-header />
    <main id="contenido" tabindex="-1"><router-outlet /></main>
    <app-footer />`,
})
export class AppComponent {}
