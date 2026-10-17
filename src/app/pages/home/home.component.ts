import { Component, DestroyRef, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../interfaces/recipe";
import { RecipeCardComponent } from "../../components/recipe-card/recipe-card.component";

@Component({
  selector: "app-home",
  imports: [RouterLink, RecipeCardComponent],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  readonly featured = signal<Recipe[]>([]);
  constructor() {
    inject(RecipeService)
      .search()
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe({
        next: (recipes) => this.featured.set(recipes.slice(0, 3)),
        error: () => this.featured.set([]),
      });
  }
}
