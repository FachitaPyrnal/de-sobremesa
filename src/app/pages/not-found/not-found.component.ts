import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-not-found",
  imports: [RouterLink],
  template: `<section class="container not-found">
    <p class="eyebrow">404 / NOS FALTA UNA PÁGINA</p>
    <span aria-hidden="true">◌</span>
    <h1>Acá no quedó<br />ni una miga.</h1>
    <p>Esta dirección no existe. Pero todavía hay mucho para cocinar.</p>
    <a class="button" routerLink="/recetas">Volver al recetario ↗</a>
  </section>`,
})
export class NotFoundComponent {}
