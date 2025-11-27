// ***********************************************************
// Archivo de soporte principal para Cypress E2E
// Se ejecuta antes de cada archivo de prueba
// ***********************************************************

// Importar comandos personalizados
import './commands';

// Configuración global antes de cada test
beforeEach(() => {
  // Limpiar cookies y localStorage antes de cada test
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Manejar excepciones no capturadas para evitar fallos inesperados
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false previene que Cypress falle el test
  // Útil para errores de terceros que no afectan las pruebas
  console.log('Uncaught exception:', err.message);
  return false;
});

// Log adicional en fallos de test
Cypress.on('fail', (error, runnable) => {
  // Tomar screenshot automático en fallos (ya configurado en cypress.config.js)
  console.log(`Test fallido: ${runnable.title}`);
  console.log(`Error: ${error.message}`);
  
  // Re-lanzar el error para que el test falle correctamente
  throw error;
});

// Configuración de reintentos (opcional)
// Cypress.config('retries', {
//   runMode: 2,
//   openMode: 0
// });

