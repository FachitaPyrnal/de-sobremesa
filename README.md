# De sobremesa

Un recetario para salir de las mismas tres comidas de siempre. Explorá platos del mundo, consultá ingredientes y preparaciones, y guardá las recetas que quieras volver a cocinar.

**Autor:** Iván Szpyrnal · **TP Final — Aplicación Multisitio con Angular** · 2026

- **Repositorio / entrega:** https://github.com/FachitaPyrnal/de-sobremesa
- **Demo:** https://fachitapyrnal.github.io/de-sobremesa/

## Instalar y ejecutar

Requiere Node.js **24 LTS** (también admite Node 20.19+ o 22.12+) y npm. Se recomienda Node 24 para usar las mismas versiones que la integración continua.

```bash
git clone https://github.com/FachitaPyrnal/de-sobremesa.git
cd de-sobremesa
npm install
npm start
```

Abrir **http://localhost:4200**. `npm start` ejecuta `ng serve` usando el Angular CLI incluido en el proyecto. También se puede ejecutar `npx ng serve`. Si ya está instalado Angular CLI globalmente, después de `npm install` funciona directamente:

```bash
ng serve
```

Para instalar el CLI global si hiciera falta: `npm install -g @angular/cli@21`.
En PowerShell, si la política de scripts bloquea `npm.ps1`, usar `npm.cmd install` y `npm.cmd start`.
No requiere backend propio, cuenta, variables de entorno ni claves privadas.

## Recorrido

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio, presentación y tres recetas obtenidas desde la API |
| `/recetas` | Listado de recetas, buscador, categoría, orden alfabético y favoritos |
| `/recetas?q=chicken` | Búsqueda que se puede compartir mediante la URL |
| `/recetas/52771` | Detalle dinámico de Spicy Arrabiata Penne |
| `/nosotros` | Página estática: Nuestra mesa |
| `/guia` | Página estática: Antes de cocinar |
| Cualquier otra ruta | Página 404 con regreso al recetario |

La cabecera y el pie permanecen en todas las páginas. Los enlaces internos usan `routerLink`; `ActivatedRoute` obtiene el ID y los parámetros de búsqueda. Las páginas se cargan con `loadComponent`.

## API utilizada

**[TheMealDB](https://www.themealdb.com/)** · [Documentación de la API](https://www.themealdb.com/api.php) · [Guía de endpoints](https://www.themealdb.com/docs_api_guide.php)

El servicio `RecipeService` consume la API pública mediante `HttpClient`:

```text
GET https://www.themealdb.com/api/json/v1/1/search.php?s=
GET https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771
```

Se usa la clave pública de prueba `1`, prevista para desarrollo y aprendizaje. Una explotación comercial debería revisar las condiciones de TheMealDB y su acceso de producción.

El listado inicial es la selección que devuelve la API, no toda su base. La búsqueda consulta nombres en inglés; el filtro de categoría, el orden y los favoritos se aplican a los resultados recibidos. Las imágenes, los nombres, los ingredientes y las instrucciones pertenecen a la fuente y conservan su idioma original. La interfaz y la guía están en español.

La aplicación no inventa tiempos de preparación ni porciones que la API no informa. Una respuesta `meals: null` se trata como búsqueda vacía o detalle inexistente; una falla de red muestra un mensaje y un botón para reintentar. Las solicitudes tienen un límite de espera de 15 segundos.

## Organización

```text
src/app/
├── components/
│   ├── header/          # Navegación con estado activo
│   ├── footer/          # Pie compartido y atribución
│   ├── recipe-card/     # Tarjeta reutilizable y favoritos
│   └── status/          # Carga, error y estados vacíos
├── pages/
│   ├── home/
│   ├── recipes/
│   ├── recipe-detail/
│   ├── about/
│   ├── guide/
│   └── not-found/
├── services/
│   ├── recipe.service.ts
│   └── favorites.service.ts
├── interfaces/recipe.ts
├── testing/meal.fixture.ts
├── app.routes.ts
└── app.config.ts
```

Angular 21, componentes standalone, TypeScript estricto, RxJS, signals y CSS propio. La identidad combina tonos crema y verde, tipografía editorial y fotos de los platos. Incluye adaptación a pantallas pequeñas, foco visible, enlace para saltar al contenido y controles etiquetados.

Los favoritos persisten en `localStorage`, en el mismo navegador y dispositivo. Si el almacenamiento está bloqueado, siguen funcionando en memoria.

## Verificar el proyecto

```bash
npm test
npm run build
```

Las pruebas de Vitest usan el entorno DOM de jsdom y `HttpTestingController`: no dependen de la disponibilidad de la API. Cubren consultas y parámetros HTTP, mapeo de ingredientes, resultados vacíos, errores, IDs inválidos, persistencia de favoritos, navegación estática, 404, cambio de ID, reintento y filtros.

La compilación genera `dist/de-sobremesa/browser/`.

### Correspondencia con la consigna

| Requisito | Implementación |
| --- | --- |
| Inicio + dos páginas estáticas | `/`, `/nosotros`, `/guia` |
| Angular Router y enlaces internos | `app.routes.ts`, `RouterLink`, `RouterLinkActive` |
| API pública mediante servicio | `RecipeService` + `HttpClient` + TheMealDB |
| Listado mediante componentes | `RecipesComponent` + `RecipeCardComponent` |
| Detalle por ID | `/recetas/:id`, consulta `lookup.php?i=...` |
| Separación de responsabilidades | components, pages, services, interfaces |
| Estilos propios e imágenes | `src/styles.css`, imágenes de TheMealDB |
| Navegación consistente | Header y footer en `AppComponent` |
| Documentación y ejecución | Este README, `package.json` y lockfile |

### Recorrido sugerido para evaluar

1. Abrir el inicio y entrar al recetario desde el botón principal.
2. Buscar `chicken`, cambiar la categoría y ordenar por nombre.
3. Abrir una tarjeta y comprobar que el ID de la URL coincide con la receta mostrada.
4. Guardar una receta con el corazón, recargar y comprobar que sigue guardada.
5. Visitar Nuestra mesa y Antes de cocinar desde la cabecera.
6. Buscar `zzzznoexiste` para ver el estado vacío; abrir `/recetas/abc` para ver un ID inválido y `/otra-pagina` para la 404.
7. Para comprobar el reintento de red en un navegador: poner la conexión en modo offline, entrar al recetario, restaurar la conexión y pulsar Volver a intentar.

## Publicación

El workflow `.github/workflows/pages.yml` instala con `npm ci`, ejecuta las pruebas, compila y publica en GitHub Pages con base `/de-sobremesa/`. Se activa al subir cambios a `main`; no se suben `node_modules` ni archivos compilados al código fuente.

En Pages, `404.html` contiene también la aplicación para que una visita directa o recarga de `/de-sobremesa/recetas/52771` pueda arrancar Angular y mostrar el detalle. GitHub Pages puede responder con estado HTTP 404 en esos enlaces directos, aunque la página se muestre correctamente; la navegación interna funciona sin recargar. Para otro alojamiento estático, configurar todas las rutas de la aplicación para servir `index.html` y ajustar `base-href` al directorio de publicación.

La disponibilidad de recetas e imágenes depende de TheMealDB. Las fuentes de Google tienen alternativas locales de tipografía si no pueden cargarse.
