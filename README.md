# QA IMDb Challenge

Proyecto de automatización de pruebas para el QA Engineer Challenge.

## Stack

- **UI Tests**: Playwright + TypeScript
- **API Tests**: Cypress

## Requisitos

- Node.js v18+
- npm v9+

## Instalación

```bash
npm install
```

## Ejecutar Tests

### UI Tests (Playwright)
```bash
# Todos los browsers
npx playwright test

# Solo Chrome
npx playwright test --project=chromium

# Solo Firefox
npx playwright test --project=firefox

# Ver reporte
npx playwright show-report
```

### API Tests (Cypress)
```bash
# Modo headless
npx cypress run

# Modo visual
npx cypress open
```

## Estructura

```
qa-imdb-challenge/
├── cypress/
│   └── e2e/
│       └── api/          # Tests de API con Cypress
├── tests/
│   ├── ui/               # Tests de UI con Playwright
│   └── pages/            # Page Objects
├── cypress.config.js
├── playwright.config.ts
└── README.md
```