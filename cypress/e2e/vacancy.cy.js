describe('Response Test', () => {
    let testData;

    const items = {
        mainPage:{
            vacancyButton:`#app > div.page > header:nth-child(1) > nav > a:nth-child(1)`,
        },
        vacancyPage:{
            responseButton:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.infinite-loader.vacancy-list > div:nth-child(4) > div.vacancy-item__info-wrapper > div.vacancy-item__footer-wrapper > div > div.vacancy-footer__button-wrapper > button.button.button__background-color-green.button__size-small.button__color-white.vacancy-page-card__button`,
        },
        authPage:{
            inputLogin:`input[type="text"]`,
            inputPassword:`input[type="password"]`,
            loginButton:`#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button`,
        },
    };

    beforeEach(() => {
        cy.fixture('student_login.json').then((data) => {
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

    it('Проверка отклика на вакансию', () => {
        cy.log('Отклик на вакансию');
        cy.get(items.mainPage.vacancyButton).should('be.visible');
        cy.get(items.mainPage.vacancyButton).click();

        cy.get(items.vacancyPage.responseButton).should('be.visible');
        cy.get(items.vacancyPage.responseButton).click();
    });
});