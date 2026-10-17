import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FavoritesService {
  private readonly key = "sobremesa-favoritos";
  readonly ids = signal<string[]>(this.read());

  private read(): string[] {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(this.key) ?? "[]");
      return Array.isArray(value)
        ? value.filter((id): id is string => typeof id === "string")
        : [];
    } catch {
      return [];
    }
  }

  has(id: string): boolean {
    return this.ids().includes(id);
  }

  toggle(id: string): void {
    this.ids.update((ids) =>
      ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
    );
    try {
      localStorage.setItem(this.key, JSON.stringify(this.ids()));
    } catch {
      /* Sigue funcionando en memoria si el navegador bloquea el almacenamiento. */
    }
  }
}
