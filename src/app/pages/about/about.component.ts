import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-about",
  imports: [RouterLink],
  template: ` <section class="container page-intro">
      <p class="eyebrow">SIEMPRE HAY LUGAR PARA UNO MÁS</p>
      <h1>Nuestra mesa<span class="accent">.</span></h1>
      <p>Porque una receta es apenas el principio.</p>
    </section>
    <section class="container editorial">
      <div class="editorial-lead">
        <span class="editorial-symbol" aria-hidden="true">✳</span>
        <h2>Comer es necesario.<br /><em>Compartir es la idea.</em></h2>
      </div>
      <div class="prose">
        <p>
          Hay comidas que se recuerdan por lo que había en el plato. Otras, por
          la charla que vino después. De sobremesa nace de esa segunda parte:
          las ganas de cocinar algo y tener con quién compartirlo.
        </p>
        <p>
          Este recetario reúne platos de distintos lugares del mundo. No busca
          decirte cómo tenés que cocinar: es una invitación a salir de las
          mismas tres comidas de siempre y probar.
        </p>
        <p>
          Los nombres, fotos, ingredientes y preparaciones vienen de TheMealDB,
          una base pública de recetas. Conservamos el contenido en inglés para
          respetar la fuente; la navegación y la guía están en español.
        </p>
        <a class="text-link" routerLink="/recetas"
          >Buscar la próxima comida ↗</a
        >
      </div>
    </section>
    <section class="container values-grid">
      <article>
        <span>01 / CURIOSIDAD</span>
        <h3>Siempre hay algo nuevo.</h3>
        <p>
          Un ingrediente distinto, otra forma de preparar arroz, una receta de
          un lugar que no conocés.
        </p>
      </article>
      <article>
        <span>02 / SENCILLEZ</span>
        <h3>Sin cocina de televisión.</h3>
        <p>
          Un cuaderno de recetas, ingredientes claros y pasos para seguir a tu
          ritmo.
        </p>
      </article>
      <article>
        <span>03 / SOBREMESA</span>
        <h3>Quedarse un rato más.</h3>
        <p>
          La mesa no se termina cuando se vacían los platos. Ese es el espíritu
          del proyecto.
        </p>
      </article>
    </section>
    <section class="container project-note">
      <p class="eyebrow">SOBRE ESTE PROYECTO</p>
      <p>
        Desarrollado por Iván Szpyrnal para el TP Final de Angular, 2026.
        Aplicación educativa con rutas, componentes y un servicio HTTP que
        consulta una API pública.
      </p>
      <a
        class="text-link"
        href="https://www.themealdb.com/api.php"
        target="_blank"
        rel="noopener noreferrer"
        >Conocer TheMealDB ↗</a
      >
    </section>`,
})
export class AboutComponent {}
