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
            workspaceButton:`#app > div.page > div > div.page-navigation > div.page-nav__mobile > section.responses-page > div.responses-list.responses-page__nav > div > article:nth-child(3) > button`,
            onReviewButton:`#app > div.page > div > div.page-navigation > div.page-nav__mobile > section.responses-page > div.responses-page__menu > nav > div > div:nth-child(3)`,
        },
        workspacePage:{
            acceptButton:`#app > div.page > div > section > div.detailed-workspace-header > div > div > div > div.status-open__buttons > button:nth-child(1)`,
            rejectButton:`#app > div.page > div > section > div.detailed-workspace-header > div > div > div > div.status-open__buttons > button:nth-child(2)`,
            workspaceStatus:`#app > div.page > div > section > div.detailed-workspace-header > div > div > article > div > p`,
        }
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

            cy.get(items.profilePage.responsesLink).should('be.visible');
            cy.get(items.profilePage.responsesLink).click();

            cy.get(items.responsesPage.onReviewButton).should('be.visible');
            cy.get(items.responsesPage.onReviewButton).click();

            cy.get(items.responsesPage.workspaceButton).should('be.visible');
            cy.get(items.responsesPage.workspaceButton).click();
        });
    });


    it('Смена статуса "Принят на вакансию"', () => {
        cy.get(items.workspacePage.acceptButton).should('be.visible');
        cy.get(items.workspacePage.acceptButton).click();

        cy.get(items.workspacePage.workspaceStatus).should('contain', 'Принят на вакансию');
    });

    it('Смена статуса "В вакансии отказано"', () => {
        cy.get(items.workspacePage.rejectButton).should('be.visible');
        cy.get(items.workspacePage.rejectButton).click();

        cy.get(items.workspacePage.workspaceStatus).should('contain', 'В вакансии отказано');
    });
})