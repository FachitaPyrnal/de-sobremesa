import { Component, computed, DestroyRef, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  catchError,
  combineLatest,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from "rxjs";
import { RecipeService } from "../../services/recipe.service";
import { FavoritesService } from "../../services/favorites.service";
import { Recipe } from "../../interfaces/recipe";
import { RecipeCardComponent } from "../../components/recipe-card/recipe-card.component";
import { StatusComponent } from "../../components/status/status.component";

@Component({
  selector: "app-recipes",
  imports: [FormsModule, RecipeCardComponent, StatusComponent],
  templateUrl: "./recipes.component.html",
})
export class RecipesComponent {
  private readonly api = inject(RecipeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly refresh = new Subject<void>();
  readonly favorites = inject(FavoritesService);
  readonly recipes = signal<Recipe[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly category = signal("Todas");
  readonly savedOnly = signal(false);
  readonly sort = signal("original");
  query = "";
  readonly categories = computed(() =>
    [...new Set(this.recipes().map((recipe) => recipe.category))].sort(),
  );
  readonly filtered = computed(() => {
    const recipes = this.recipes().filter(
      (recipe) =>
        (this.category() === "Todas" || recipe.category === this.category()) &&
        (!this.savedOnly() || this.favorites.has(recipe.id)),
    );
    return this.sort() === "nombre"
      ? recipes.sort((a, b) => a.name.localeCompare(b.name))
      : recipes;
  });

  constructor() {
    combineLatest([
      this.route.queryParamMap,
      this.refresh.pipe(startWith(undefined)),
    ])
      .pipe(
        map(([params]) => params.get("q") ?? ""),
        switchMap((query) => {
          this.query = query;
          this.category.set("Todas");
          return this.api.search(query).pipe(
            map((recipes) => ({ recipes, loading: false, error: false })),
            catchError(() =>
              of({ recipes: [] as Recipe[], loading: false, error: true }),
            ),
            startWith({ recipes: [] as Recipe[], loading: true, error: false }),
          );
        }),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((state) => {
        this.recipes.set(state.recipes);
        this.loading.set(state.loading);
        this.error.set(state.error);
      });
  }

  search(): void {
    const query = this.query.trim();
    if (query === (this.route.snapshot.queryParamMap.get("q") ?? "")) {
      this.retry();
      return;
    }
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query ? { q: query } : {},
    });
  }

  retry(): void {
    this.refresh.next();
  }

  clear(): void {
    this.category.set("Todas");
    this.savedOnly.set(false);
    this.query = "";
    this.search();
  }
}
