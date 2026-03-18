# 🧪 Cypress Login SauceDemo

Proyecto de automatización de pruebas E2E con **Cypress + JavaScript** para la aplicación [SauceDemo](https://www.saucedemo.com).

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/jennyloz89/cypress-login-saucedemo/cypress.yml?branch=main&style=for-the-badge" alt="CI Status" />
  <img src="https://img.shields.io/badge/Cypress-13.6-17202C?style=for-the-badge&logo=cypress" alt="Cypress" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js" alt="Node" />
  <img src="https://img.shields.io/github/license/jennyloz89/cypress-login-saucedemo?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <a href="https://jennyloz89.github.io/cypress-login-saucedemo/">
    <img src="https://img.shields.io/badge/📊_Ver_Reporte-GitHub_Pages-181717?style=for-the-badge&logo=github" alt="Ver reporte" />
  </a>
</p>

## 📋 Características

- ✅ Validación de login con credenciales válidas e inválidas
- ✅ Navegación a dashboard
- ✅ Verificación de elementos visibles
- ✅ Uso de fixtures para datos de prueba
- ✅ Reporte de resultados con screenshots
- ✅ Page Object Model (POM)
- ✅ Comandos personalizados reutilizables

## 📁 Estructura del Proyecto

```
cypress-login-saucedemo/
├── cypress/
│   ├── e2e/                          # Tests E2E
│   │   ├── login/
│   │   │   └── login.cy.js           # Tests de login
│   │   └── dashboard/
│   │       └── dashboard.cy.js       # Tests de dashboard
│   │
│   ├── fixtures/                     # Datos de prueba
│   │   └── users.json                # Credenciales de usuarios
│   │
│   ├── support/
│   │   ├── commands.js               # Comandos personalizados
│   │   ├── e2e.js                    # Configuración global
│   │   └── pages/                    # Page Object Model
│   │       ├── LoginPage.js
│   │       └── DashboardPage.js
│   │
│   ├── reports/                      # Reporte HTML (Mochawesome)
│   ├── screenshots/                  # Screenshots automáticos
│   └── videos/                       # Videos de ejecución
│
├── .github/workflows/                # CI/CD (GitHub Actions)
│   └── cypress.yml
├── docs/                             # Reporte HTML (para GitHub Pages / portafolio)
├── cypress.config.js                 # Configuración de Cypress
├── package.json                      # Dependencias
└── README.md                         # Documentación
```

## 🚀 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd cypress-login-saucedemo
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

## 💻 Ejecución de Tests

### Abrir Cypress (modo interactivo)
```bash
npm run cy:open
```

### Ejecutar todos los tests (modo headless)
```bash
npm run cy:run
```

### Ejecutar tests con navegador visible
```bash
npm run cy:run:headed
```

### Ejecutar tests en Chrome
```bash
npm run cy:chrome
```

### Ejecutar tests en Firefox
```bash
npm run cy:firefox
```

## 📊 Reportes

- **Reporte HTML (Mochawesome):** Tras `npm run cy:run` o `npm run cy:report`, se genera el reporte en la carpeta **`docs/`**. Abre `docs/index.html` en el navegador para ver resultados, gráficos, duración y screenshots. Esa misma carpeta se puede publicar con **GitHub Pages** para enlazar el reporte desde tu portafolio.
- **Screenshots:** Se generan automáticamente cuando un test falla. Se guardan en `cypress/screenshots/`
- **Videos:** Se graban automáticamente durante la ejecución en modo headless. Se guardan en `cypress/videos/`

### 🌐 Ver el reporte en GitHub Pages (portafolio)

1. Ejecuta las pruebas y genera el reporte: `npm run cy:run`
2. Haz commit y push de la carpeta `docs/` (incluye el HTML del reporte)
3. En el repo de GitHub: **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main**, Folder: **/docs** → Save
4. La URL será: `https://jennyloz89.github.io/cypress-login-saucedemo/` (o `.../index.html`). Usa ese enlace en tu portafolio para que al hacer clic se abra el reporte.

## 🔄 CI/CD (GitHub Actions)

El proyecto incluye un workflow en `.github/workflows/cypress.yml` que:

- Se ejecuta en cada **push** y **pull request** a `main` o `master`
- Instala dependencias con `npm ci`
- Ejecuta las pruebas con Cypress
- Sube el **reporte HTML** como artefacto (descargable en la pestaña *Actions* → ejecución → *Artifacts*)
- Sube **screenshots** si hay fallos (retención 7 días)

Para ejecutar el workflow manualmente: **Actions** → **Cypress E2E Tests** → **Run workflow**.

## 🧪 Casos de Prueba

### Login (`login.cy.js`)

| Test | Descripción |
|------|-------------|
| Elementos de página | Verifica que todos los elementos del formulario estén visibles |
| Login exitoso | Login con usuario estándar |
| Credenciales inválidas | Error con usuario/contraseña incorrectos |
| Usuario bloqueado | Error con usuario locked_out_user |
| Campos vacíos | Error cuando username/password están vacíos |
| Cerrar error | Funcionalidad de cerrar mensaje de error |
| Seguridad de sesión | Verificar que no se puede acceder sin login |

### Dashboard (`dashboard.cy.js`)

| Test | Descripción |
|------|-------------|
| Navegación | Verifica navegación correcta después del login |
| Elementos visibles | Verifica título, navegación, footer, productos |
| Menú lateral | Abrir/cerrar menú, verificar opciones |
| Carrito | Agregar/remover productos, contador |
| Ordenamiento | Ordenar por nombre (A-Z, Z-A) y precio |
| Detalle de producto | Navegación al detalle |
| Logout | Cerrar sesión correctamente |
| Reset App State | Resetear estado de la aplicación |

## 🔧 Comandos Personalizados

```javascript
// Login básico
cy.login(username, password);

// Login usando fixtures
cy.loginWithFixture('validUser');

// Login y verificar dashboard
cy.loginAndVerify(username, password);

// Tomar screenshot
cy.takeScreenshot('nombre-screenshot');

// Agregar al carrito
cy.addToCart(0);

// Verificar contador del carrito
cy.verifyCartCount(3);

// Logout
cy.logout();
```

## 📦 Usuarios de Prueba

| Usuario | Descripción |
|---------|-------------|
| `standard_user` | Usuario estándar, funciona correctamente |
| `locked_out_user` | Usuario bloqueado |
| `problem_user` | Usuario con problemas de interfaz |
| `performance_glitch_user` | Usuario con retardos de rendimiento |

**Contraseña para todos:** `secret_sauce`

## 🛠️ Tecnologías

- [Cypress](https://www.cypress.io/) v13.6.0
- JavaScript ES6+
- Page Object Model
- Node.js

## 📝 Licencia

ISC

