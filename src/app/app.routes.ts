import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "De sobremesa — Recetas para compartir",
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "recetas",
    title: "El recetario | De sobremesa",
    loadComponent: () =>
      import("./pages/recipes/recipes.component").then(
        (m) => m.RecipesComponent,
      ),
  },
  {
    path: "recetas/:id",
    title: "Una receta para probar | De sobremesa",
    loadComponent: () =>
      import("./pages/recipe-detail/recipe-detail.component").then(
        (m) => m.RecipeDetailComponent,
      ),
  },
  {
    path: "nosotros",
    title: "Nuestra mesa | De sobremesa",
    loadComponent: () =>
      import("./pages/about/about.component").then((m) => m.AboutComponent),
  },
  {
    path: "guia",
    title: "Antes de cocinar | De sobremesa",
    loadComponent: () =>
      import("./pages/guide/guide.component").then((m) => m.GuideComponent),
  },
  {
    path: "**",
    title: "Página no encontrada | De sobremesa",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
  },
];
