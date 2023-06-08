
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add(`restoreSession`, function ({ cookies, lsd, ssd }) {
  const wList = [];
  cy.clearCookies();
  cookies.forEach((cookie) => {
    wList.push(cookie.name);
    cy.setCookie(cookie.name, cookie.value, {
      log: true,
      domain: cookie.domain,
      path: cookie.path,
      expiry: cookie.expires,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
    });
  });

  // Cypress.Cookies.defaults({
  //   preserve: wList,
  // });
  // cy.session({
  //   preserve: wList,
  // })

  cy.window().then((window) => {
    Object.keys(ssd).forEach((key) => window.sessionStorage.setItem(key, ssd[key]));
    Object.keys(lsd).forEach((key) => window.localStorage.setItem(key, lsd[key]));
  });
});

Cypress.Commands.add('verifyCertifacteEndDate', (date, url) => {
  cy.exec(
    `echo | openssl s_client -servername ${url} -connect ${url}:443 2>/dev/null | openssl x509 -noout -enddate
    `,
  ).then(({ stdout }) => {
    let certEndDate = new Date(stdout.split('=')[1]);
    let assertDate = new Date(date);
    cy.log('Certification End Date: ' + certEndDate.toString());
    cy.log('Inputed Date: ' + assertDate.toString());
    expect(certEndDate.getMonth()).equal(assertDate.getMonth());
    expect(certEndDate.getYear()).equal(assertDate.getYear());
    expect(certEndDate.getDate()).equal(assertDate.getDate());
  });
});
Cypress.Commands.add('origintmalogin', () => {
  cy.task('loginToTMA').then(({cookies, ssd, lsd}) => {
    const wList = [];
    cy.clearCookies();
    cookies.forEach((cookie) => {
      wList.push(cookie.name);
      cy.setCookie(cookie.name, cookie.value, {
        log: true,
        domain: cookie.domain,
        path: cookie.path,
        expiry: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
      });
    });
    cy.log(wList)
    // Cypress.Cookies.defaults({
    //   preserve: wList,
    // });
    // cy.session({
    //   preserve: wList,
    // })
  
    cy.window().then((window) => {
      Object.keys(ssd).forEach((key) => window.sessionStorage.setItem(key, ssd[key]));
      Object.keys(lsd).forEach((key) => window.localStorage.setItem(key, lsd[key]));
    });
  })
})
Cypress.Commands.add('originsosaalogin', () => {
  cy.task('loginToSOSAA').then(({cookies, ssd, lsd}) => {
    const wList = [];
    cy.clearCookies();
    cookies.forEach((cookie) => {
      wList.push(cookie.name);
      cy.setCookie(cookie.name, cookie.value, {
        log: true,
        domain: cookie.domain,
        path: cookie.path,
        expiry: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
      });
    });
    cy.log(wList)
    // Cypress.Cookies.defaults({
    //   preserve: wList,
    // });
    // cy.session({
    //   preserve: wList,
    // })
    // cy.setCookie("preserve",)
  
    cy.window().then((window) => {
      Object.keys(ssd).forEach((key) => window.sessionStorage.setItem(key, ssd[key]));
      Object.keys(lsd).forEach((key) => window.localStorage.setItem(key, lsd[key]));
    });
  })
})
Cypress.Commands.add('injectAxe', () => {
  cy.window({ log: false }).then(window => {
      const axe = require('axe-core/axe.js');
      const script = window.document.createElement('script');
      script.innerHTML = axe.source;
      window.document.head.appendChild(script);
  })
})
const COMMAND_DELAY = 0;
if (COMMAND_DELAY > 0) {
  for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(origVal);
        }, COMMAND_DELAY);
      });
    });
  }
}
