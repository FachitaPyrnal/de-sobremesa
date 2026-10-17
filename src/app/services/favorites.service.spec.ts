import { FavoritesService } from "./favorites.service";

describe("FavoritesService", () => {
  beforeEach(() => localStorage.clear());
  it("guarda favoritos y los recupera en una nueva instancia", () => {
    const service = new FavoritesService();
    service.toggle("52771");
    expect(service.has("52771")).toBe(true);
    const restored = new FavoritesService();
    expect(restored.has("52771")).toBe(true);
    restored.toggle("52771");
    expect(restored.has("52771")).toBe(false);
    expect(JSON.parse(localStorage.getItem("sobremesa-favoritos")!)).toEqual(
      [],
    );
  });
  it("tolera datos corruptos o con un formato inesperado", () => {
    localStorage.setItem("sobremesa-favoritos", "{invalid");
    expect(new FavoritesService().ids()).toEqual([]);
    localStorage.setItem("sobremesa-favoritos", '[42,"52771",null]');
    expect(new FavoritesService().ids()).toEqual(["52771"]);
  });
});
