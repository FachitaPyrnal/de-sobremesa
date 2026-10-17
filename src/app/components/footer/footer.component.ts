import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  imports: [RouterLink],
  template: `<footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <a class="brand" routerLink="/">de sobremesa.</a>
        <p>La mejor parte siempre es compartir.</p>
      </div>
      <div class="footer-links">
        <a routerLink="/nosotros">El proyecto</a
        ><a routerLink="/guia">Guía de cocina</a
        ><a
          href="https://www.themealdb.com/api.php"
          target="_blank"
          rel="noopener noreferrer"
          >Datos: TheMealDB ↗</a
        >
      </div>
      <small>Iván Szpyrnal · TP Final Angular · 2026</small>
    </div>
  </footer>`,
})
export class FooterComponent {}
