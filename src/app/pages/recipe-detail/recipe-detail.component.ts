import { Component, DestroyRef, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  catchError,
  of,
  startWith,
  Subject,
  switchMap,
  map,
  combineLatest,
} from "rxjs";
import { Recipe } from "../../interfaces/recipe";
import { RecipeService } from "../../services/recipe.service";
import { FavoritesService } from "../../services/favorites.service";
import { StatusComponent } from "../../components/status/status.component";

@Component({
  selector: "app-recipe-detail",
  imports: [RouterLink, StatusComponent],
  templateUrl: "./recipe-detail.component.html",
})
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(RecipeService);
  private readonly title = inject(Title);
  private readonly refresh = new Subject<void>();
  readonly favorites = inject(FavoritesService);
  readonly recipe = signal<Recipe | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

  constructor() {
    combineLatest([
      this.route.paramMap,
      this.refresh.pipe(startWith(undefined)),
    ])
      .pipe(
        switchMap(([params]) =>
          this.api.getById(params.get("id") ?? "").pipe(
            map((recipe) => ({ recipe, loading: false, error: false })),
            catchError(() => of({ recipe: null, loading: false, error: true })),
            startWith({ recipe: null, loading: true, error: false }),
          ),
        ),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((state) => {
        this.recipe.set(state.recipe);
        this.loading.set(state.loading);
        this.error.set(state.error);
        if (state.recipe)
          this.title.setTitle(`${state.recipe.name} | De sobremesa`);
      });
  }

  retry(): void {
    this.refresh.next();
  }
}
