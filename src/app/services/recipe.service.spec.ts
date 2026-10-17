import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { RecipeService, mapRecipe } from "./recipe.service";
import { testMeal } from "../testing/meal.fixture";

describe("RecipeService", () => {
  let service: RecipeService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RecipeService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it("busca por nombre con parámetros HTTP y convierte la respuesta", () => {
    let names: string[] = [];
    service
      .search("pasta & rice")
      .subscribe((recipes) => (names = recipes.map((recipe) => recipe.name)));
    const request = http.expectOne(
      (req) =>
        req.url.endsWith("/search.php") &&
        req.params.get("s") === "pasta & rice",
    );
    expect(request.request.method).toBe("GET");
    request.flush({ meals: [testMeal] });
    expect(names).toEqual(["Spicy Arrabiata Penne"]);
  });
  it("convierte una búsqueda sin coincidencias en una lista vacía", () => {
    let result: unknown;
    service.search("noexiste").subscribe((value) => (result = value));
    http
      .expectOne((req) => req.params.get("s") === "noexiste")
      .flush({ meals: null });
    expect(result).toEqual([]);
  });
  it("consulta el detalle con el ID solicitado", () => {
    let id: string | undefined;
    service.getById("52771").subscribe((recipe) => (id = recipe?.id));
    http
      .expectOne(
        (req) =>
          req.url.endsWith("/lookup.php") && req.params.get("i") === "52771",
      )
      .flush({ meals: [testMeal] });
    expect(id).toBe("52771");
  });
  it("distingue un ID inexistente de una falla de conexión", () => {
    let result: unknown;
    service.getById("99999999").subscribe((value) => (result = value));
    http
      .expectOne((req) => req.params.get("i") === "99999999")
      .flush({ meals: null });
    expect(result).toBeNull();
    let failed = false;
    service.search().subscribe({ error: () => (failed = true) });
    http
      .expectOne((req) => req.url.endsWith("/search.php"))
      .flush("Unavailable", { status: 503, statusText: "Unavailable" });
    expect(failed).toBe(true);
  });
  it("no envía IDs inválidos a la API", () => {
    let result: unknown;
    service.getById("abc").subscribe((value) => (result = value));
    http.expectNone((req) => req.url.endsWith("/lookup.php"));
    expect(result).toBeNull();
  });
  it("normaliza ingredientes, elimina líneas vacías y descarta enlaces inseguros", () => {
    const recipe = mapRecipe({ ...testMeal, strSource: "javascript:alert(1)" });
    expect(recipe.ingredients).toEqual([
      { name: "Penne", measure: "500 g" },
      { name: "Tomatoes", measure: "400 g" },
    ]);
    expect(recipe.instructions).toEqual(["Boil the pasta.", "Add the sauce."]);
    expect(recipe.source).toBeNull();
  });
});
