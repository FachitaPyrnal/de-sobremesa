import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterLinkActive],
  template: `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" routerLink="/" aria-label="De sobremesa, inicio"
        ><span class="brand-symbol" aria-hidden="true">◉</span> de
        sobremesa<span class="brand-dot">.</span></a
      >
      <nav aria-label="Navegación principal">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Inicio</a
        >
        <a routerLink="/recetas" routerLinkActive="active">Recetario</a>
        <a routerLink="/nosotros" routerLinkActive="active">Nuestra mesa</a>
        <a routerLink="/guia" routerLinkActive="active">Antes de cocinar</a>
      </nav>
    </div>
  </header>`,
})
export class HeaderComponent {}
