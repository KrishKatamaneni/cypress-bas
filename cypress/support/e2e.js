import './commands';
import "cypress-axe";
require('cypress-xpath')
const dayjs = require('dayjs')
Cypress.dayjs = dayjs
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
