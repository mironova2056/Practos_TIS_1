describe('WorkspaceTest', () => {
    let testData;

    const items = {
        authPage:{
            inputLogin:`input[type="text"]`,
            inputPassword:`input[type="password"]`,
            loginButton:`#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button`,
        },
        profilePage:{
            responsesLink:`#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(5) > p`,
        },
        responsesPage:{
            approveButton:`#app > div.page > div > div.page-navigation > div.page-nav__mobile > section.responses-page > div.responses-list.responses-page__nav > div > article:nth-child(3) > div.responses-list-item__actions > div:nth-child(1)`,
            workspaceButton:`#app > div.page > div > div.page-navigation > div.page-nav__mobile > section.responses-page > div.responses-list.responses-page__nav > div > article:nth-child(2) > button`,
        },
    };

    beforeEach(() => {
        cy.fixture('employer_login.json').then((data) => {
            testData = data;
            cy.visit(testData.url);

            cy.get(items.authPage.inputLogin).should('be.visible');
            cy.get(items.authPage.inputLogin).type(testData.login);

            cy.get(items.authPage.inputPassword).should('be.visible');
            cy.get(items.authPage.inputPassword).type(testData.password);

            cy.get(items.authPage.loginButton).should('be.visible');
            cy.get(items.authPage.loginButton).click();
        });
    });

    it('Проверка подтверждения отклика на вакансию', () => {
        cy.get(items.profilePage.responsesLink).should('be.visible');
        cy.get(items.profilePage.responsesLink).click();

        cy.get(items.responsesPage.approveButton).should('be.visible');
        cy.get(items.responsesPage.approveButton).click();
    });
})