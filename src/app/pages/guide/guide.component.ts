import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-guide",
  imports: [RouterLink],
  template: ` <section class="container page-intro">
      <p class="eyebrow">UN POCO DE ORDEN, MUCHAS GANAS</p>
      <h1>Antes de cocinar<span class="accent">.</span></h1>
      <p>Algunas cosas simples que hacen la diferencia.</p>
    </section>
    <section class="container guide-layout">
      <aside class="guide-note">
        <span aria-hidden="true">✳</span>
        <h2>Primero leé.<br />Después prendé<br />el fuego.</h2>
        <p>Parece obvio. Casi siempre nos acordamos cuando ya es tarde.</p>
        <a class="text-link" routerLink="/recetas"
          >Ya estoy, vamos a cocinar ↗</a
        >
      </aside>
      <div class="guide-steps">
        <article>
          <span>01</span>
          <div>
            <h2>Leé la receta completa.</h2>
            <p>
              Revisá ingredientes, cantidades y pasos antes de empezar. Si hay
              que marinar o dejar reposar, mejor enterarte ahora.
            </p>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <h2>Dejá todo a mano.</h2>
            <p>
              Lavá, cortá y medí lo que vayas a usar. Tener la mesada lista
              evita andar buscando cosas con la sartén caliente.
            </p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <h2>Entendé las medidas.</h2>
            <p>
              En las recetas, “tsp” significa cucharadita y “tbsp”, cucharada.
              “Cup” es taza; “to taste”, a gusto. Usá medidores cuando la
              precisión sea importante, especialmente en repostería.
            </p>
          </div>
        </article>
        <article>
          <span>04</span>
          <div>
            <h2>Cuidá la cocina.</h2>
            <p>
              Lavate las manos, separá los utensilios que tocan alimentos crudos
              y mantené limpia la mesada. Usá una superficie firme para cortar.
            </p>
          </div>
        </article>
        <article>
          <span>05</span>
          <div>
            <h2>Probá y tomá nota.</h2>
            <p>
              El punto de sal, el picante y las especias también dependen de
              vos. Anotá qué cambiarías para la próxima y guardá la receta con
              el corazón.
            </p>
          </div>
        </article>
      </div>
    </section>
    <section class="container faq">
      <p class="eyebrow">SOBRE EL RECETARIO</p>
      <h2>Unas dudas habituales.</h2>
      <details>
        <summary>¿Por qué las recetas están en inglés?</summary>
        <p>
          TheMealDB publica el contenido en inglés. Mantenemos los nombres,
          ingredientes y pasos originales para evitar traducciones imprecisas.
          Buscá también en inglés: “chicken”, “pasta” o “cake”.
        </p>
      </details>
      <details>
        <summary>¿Dónde se guardan mis favoritas?</summary>
        <p>
          En el almacenamiento local de este navegador. No necesitás una cuenta.
          Si borrás los datos del sitio o cambiás de dispositivo, no se
          trasladan. El filtro de favoritas actúa sobre los resultados de tu
          búsqueda actual.
        </p>
      </details>
      <details>
        <summary>¿Por qué veo pocas recetas?</summary>
        <p>
          La API devuelve una selección al abrir el recetario. Probá distintas
          búsquedas para encontrar otros platos; la categoría filtra solo los
          resultados recibidos.
        </p>
      </details>
    </section>`,
})
export class GuideComponent {}
