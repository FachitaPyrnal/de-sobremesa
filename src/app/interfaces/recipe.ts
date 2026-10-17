export interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  area: string;
  instructions: string[];
  ingredients: { name: string; measure: string }[];
  source: string | null;
  video: string | null;
}

// TheMealDB devuelve los ingredientes como strIngredient1...20.
export interface ApiMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strSource: string | null;
  strYoutube: string | null;
  [key: string]: string | null;
}

export interface MealsResponse {
  meals: ApiMeal[] | null;
}
