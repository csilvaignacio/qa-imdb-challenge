# QA IMDb Challenge

Suite de automatización de pruebas para el desafío de QA Engineer, cubriendo tests de UI sobre IMDb y tests de API sobre PokéAPI.

---

## Stack tecnológico

| Herramienta | Uso |
|---|---|
| [Playwright](https://playwright.dev/) + TypeScript | Tests de UI (Chrome y Firefox) |
| [Cypress](https://www.cypress.io/) | Tests de API REST |
| Page Object Model | Patrón de diseño para UI tests |

---

## Requisitos previos

- **Node.js** v18 o superior
- **npm** v9 o superior

Verificá tu versión:
```bash
node --version
npm --version
```

---

## Instalación

```bash
npm install
```

Esto instala Playwright, Cypress y todas sus dependencias.

> **Nota:** Playwright también necesita los navegadores. Si es la primera vez, ejecutá:
> ```bash
> npx playwright install
> ```

---

## Ejecutar Tests de UI — Playwright

Los tests de UI automatizan escenarios sobre [IMDb.com](https://www.imdb.com) y corren en Chrome y Firefox.

```bash
# Todos los tests en Chrome y Firefox con navegador visible
npx playwright test --project=chromium --project=firefox --headed

# Solo Chrome con navegador visible
npx playwright test --project=chromium --headed

# Solo Firefox con navegador visible
npx playwright test --project=firefox --headed

# Un test específico
npx playwright test TC01

# Ver el reporte HTML al finalizar
npx playwright show-report
```

### Casos de prueba UI

| Test | Descripción |
|---|---|
| TC01 | Busca a Nicolas Cage, despliega la pestaña *Upcoming* y hace clic en la primera película con etiqueta *Completed* |
| TC02 | Navega a *Top Box Office*, selecciona el 2° elemento, califica con 5 estrellas |
| TC03 | Navega a *Top 250 TV Shows*, entra a Breaking Bad, filtra fotos por Danny Trejo y hace clic en la 2° foto |
| TC04 | Navega a *Born today*, busca celebridades nacidas ayer y toma screenshot del 3° resultado |
| TC05 | Navega a *Born today*, busca celebridades nacidas hace exactamente 40 años usando date picker y toma screenshot |

Las capturas de pantalla de TC04 y TC05 se guardan en `test-results/`.

---

## Ejecutar Tests de API — Cypress

Los tests de API cubren los endpoints de [PokéAPI](https://pokeapi.co/).

```bash
# Modo headless (recomendado para CI)
npx cypress run

# Modo visual con interfaz gráfica
npx cypress open
```

### Casos de prueba API

| Test | Endpoint | Escenario |
|---|---|---|
| berry - ID válido | `/berry/{id}` | Retorna 200 con los campos esperados |
| berry - nombre válido | `/berry/{nombre}` | Retorna 200 con los campos esperados |
| berry - ID inválido | `/berry/99999` | Retorna 404 |
| berry - nombre inválido | `/berry/nombreinvalido` | Retorna 404 |
| berry-flavor - nombre válido | `/berry-flavor/{nombre}` | Retorna 200 con contest_type y berries |
| berry spicy con mayor potency | `/berry-flavor/spicy` → `/berry/{nombre}` | Obtiene la berry con mayor potencia y verifica sus datos |

---

## Estructura del proyecto

```
qa-imdb-challenge/
├── cypress/
│   ├── e2e/
│   │   └── api/
│   │       ├── berry.cy.js            # Tests del endpoint /berry/
│   │       └── berrry-flavor.cy.js    # Tests del endpoint /berry-flavor/
│   ├── fixtures/
│   │   ├── berry-valid.json           # Datos esperados para /berry/
│   │   └── berry-flavor-valid.json    # Datos esperados para /berry-flavor/
│   └── support/
├── tests/
│   ├── components/
│   │   ├── FilterComponent.ts         # Filtro de galería de fotos
│   │   ├── MediaviewerComponent.ts    # Visor de media
│   │   └── MenuComponent.ts          # Menú de navegación principal
│   ├── pages/
│   │   ├── BasePage.ts               # Clase base con métodos comunes
│   │   ├── IMDHomePage.ts            # Página de inicio de IMDb
│   │   ├── ProfilePage.ts            # Perfil de persona
│   │   ├── ChartsPage.ts             # Páginas de rankings (Box Office, Top 250)
│   │   ├── TitlePage.ts              # Página de título (película/serie)
│   │   ├── GalleryPage.ts            # Galería de fotos
│   │   └── AdvancedSearchPage.ts     # Búsqueda avanzada (Born today)
│   └── ui/
│       ├── TC01.spec.ts
│       ├── TC02.spec.ts
│       ├── TC03.spec.ts
│       ├── TC04.spec.ts
│       └── TC05.spec.ts
├── cypress.config.js
├── playwright.config.ts
├── tsconfig.json
└── package.json
```