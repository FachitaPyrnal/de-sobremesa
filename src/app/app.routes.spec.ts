import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { routes } from "./app.routes";
import { RecipesComponent } from "./pages/recipes/recipes.component";
import { RecipeDetailComponent } from "./pages/recipe-detail/recipe-detail.component";
import { testMeal } from "./testing/meal.fixture";

describe("Navegación del recetario", () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it("abre las dos páginas estáticas y la página 404", async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl("/nosotros");
    expect(harness.routeNativeElement?.textContent).toContain("Nuestra mesa");
    await harness.navigateByUrl("/guia");
    expect(harness.routeNativeElement?.textContent).toContain(
      "Antes de cocinar",
    );
    await harness.navigateByUrl("/una-ruta-inexistente");
    expect(harness.routeNativeElement?.textContent).toContain("ni una miga");
  });
  it("usa el parámetro de URL y cambia el detalle al navegar a otro ID", async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl("/recetas/52771", RecipeDetailComponent);
    http
      .expectOne((req) => req.params.get("i") === "52771")
      .flush({ meals: [testMeal] });
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain(
      "Spicy Arrabiata Penne",
    );
    await harness.navigateByUrl("/recetas/42", RecipeDetailComponent);
    http
      .expectOne((req) => req.params.get("i") === "42")
      .flush({
        meals: [{ ...testMeal, idMeal: "42", strMeal: "Otra receta" }],
      });
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain("Otra receta");
    expect(harness.routeNativeElement?.textContent).not.toContain(
      "Spicy Arrabiata Penne",
    );
  });
  it("muestra errores, reintenta y permite filtrar resultados", async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl(
      "/recetas?q=pasta",
      RecipesComponent,
    );
    http
      .expectOne((req) => req.params.get("s") === "pasta")
      .flush(null, { status: 500, statusText: "Error" });
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain(
      "no llegó a la mesa",
    );
    page.retry();
    http
      .expectOne((req) => req.params.get("s") === "pasta")
      .flush({
        meals: [
          testMeal,
          {
            ...testMeal,
            idMeal: "42",
            strMeal: "Cake",
            strCategory: "Dessert",
          },
        ],
      });
    harness.detectChanges();
    expect(page.filtered().length).toBe(2);
    page.category.set("Pasta");
    expect(page.filtered().map((recipe) => recipe.id)).toEqual(["52771"]);
    harness.detectChanges();
    expect(
      harness.routeNativeElement?.querySelector("h3 a")?.getAttribute("href"),
    ).toBe("/recetas/52771");
  });
});
