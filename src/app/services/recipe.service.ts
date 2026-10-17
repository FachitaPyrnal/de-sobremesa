import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of, timeout } from "rxjs";
import { ApiMeal, MealsResponse, Recipe } from "../interfaces/recipe";

export function mapRecipe(meal: ApiMeal): Recipe {
  const ingredients: Recipe["ingredients"] = [];
  for (let index = 1; index <= 20; index++) {
    const name = meal[`strIngredient${index}`]?.trim();
    if (name)
      ingredients.push({
        name,
        measure: meal[`strMeasure${index}`]?.trim() ?? "",
      });
  }
  const safeLink = (value: string | null): string | null =>
    value?.startsWith("https://") ? value : null;
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
    ingredients,
    source: safeLink(meal.strSource),
    video: safeLink(meal.strYoutube),
  };
}

@Injectable({ providedIn: "root" })
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = "https://www.themealdb.com/api/json/v1/1";

  search(query = ""): Observable<Recipe[]> {
    return this.http
      .get<MealsResponse>(`${this.baseUrl}/search.php`, {
        params: { s: query },
      })
      .pipe(
        timeout(15000),
        map((response) => (response.meals ?? []).map(mapRecipe)),
      );
  }

  getById(id: string): Observable<Recipe | null> {
    if (!/^\d+$/.test(id)) return of(null);
    return this.http
      .get<MealsResponse>(`${this.baseUrl}/lookup.php`, { params: { i: id } })
      .pipe(
        timeout(15000),
        map((response) =>
          response.meals?.[0] ? mapRecipe(response.meals[0]) : null,
        ),
      );
  }
}
