import { Component, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Recipe } from "../../interfaces/recipe";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "app-recipe-card",
  imports: [RouterLink],
  template: `<article class="recipe-card">
    <div class="card-image">
      <a
        [routerLink]="['/recetas', recipe().id]"
        tabindex="-1"
        aria-hidden="true"
        ><img
          [src]="recipe().image"
          [alt]="recipe().name"
          loading="lazy"
          width="480"
          height="360"
      /></a>
      <button
        type="button"
        class="favorite"
        [class.saved]="favorites.has(recipe().id)"
        [attr.aria-pressed]="favorites.has(recipe().id)"
        [attr.aria-label]="
          (favorites.has(recipe().id)
            ? 'Quitar de favoritos: '
            : 'Guardar receta: ') + recipe().name
        "
        (click)="favorites.toggle(recipe().id)"
      >
        {{ favorites.has(recipe().id) ? "♥" : "♡" }}
      </button>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span>{{ recipe().category }}</span
        ><span>{{ recipe().area }}</span>
      </div>
      <h3>
        <a [routerLink]="['/recetas', recipe().id]">{{ recipe().name }}</a>
      </h3>
      <a class="text-link" [routerLink]="['/recetas', recipe().id]"
        >Ver receta <span aria-hidden="true">↗</span></a
      >
    </div>
  </article>`,
})
export class RecipeCardComponent {
  readonly recipe = input.required<Recipe>();
  readonly favorites = inject(FavoritesService);
}
