describe('Creating Vacancy Test', () => {
    let testData;

    const items = {
        vacancyPage: {
            createButton: `#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.infinite-loader.vacancy-list > div:nth-child(4) > div.vacancy-item__info-wrapper > div.vacancy-item__footer-wrapper > div > div.vacancy-footer__button-wrapper > button.button.button__background-color-green.button__size-small.button__color-white.vacancy-page-card__button`,
        },
        profilePage: {
            vacanciesLink: `#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(7) > p`,
        },
        authPage: {
            inputLogin: `input[type="text"]`,
            inputPassword: `input[type="password"]`,
            loginButton: `#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button`,
        },
    }
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

            cy.get(items.profilePage.vacanciesLink).should('be.visible');
            cy.get(items.profilePage.vacanciesLink).click();

        });
    });

    it('Создание вакансии с различными вариантами', () => {
        const jobTitles = ['Кладовщик', 'Менеджер', 'Разработчик']; // Варианты должностей
        const salaryTypes = ['По диапазону', 'По договорённости', 'Фиксированная'];
        const employmentTypes = ['Очный']; // Добавьте все варианты типов занятости
        const workSchedules = ['5/2', '2/2'];
        const requirements = 'Ваши требования';
        const responsibilities = 'Обязанности сотрудника';

        cy.get(`#app > div.page > div > div.page-navigation > div.page-nav__mobile > div:nth-child(6) > section > div.vacancies-block__filters-wrapper > button`).click();

        jobTitles.forEach(title => {
            salaryTypes.forEach(salary => {
                workSchedules.forEach(schedule => {
                    employmentTypes.forEach(employmentType => {


                        cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(1) > div > input`).type(title,{force: true});
                        // Обработка выбора заработной платы
                        if (salary === 'Фиксированная') {
                            cy.get(`input[name="salary-field-radio"][value="Фиксированная"]`).check({force: true});
                            cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(2) > div > div:nth-child(3) > div > div > input`).type('30000')// Выбор фиксированной заработной платы
                        } else if (salary === 'По договорённости') {
                            cy.get(`input[name="salary-field-radio"][value="По договорённости"]`).check({force: true}); // Выбор заработной платы по договорённости
                        } else if (salary === 'По диапазону') {
                            cy.get(`input[name="salary-field-radio"][value="По диапазону"]`).check({force: true}); // Выбор заработной платы по диапазону
                            cy.wait(1000)
                            cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(1) > div > input`).type('30000',{force: true}); // Минимальная зарплата
                            cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(2) > div > input`).type('60000',{force: true}); // Максимальная зарплата
                        }

                        // Выбор типа занятости
                        cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(3) > div > div > div`).click();
                        cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(3) > div > div > div.form-select__items > div:nth-child(1)`).contains(employmentType).click();

                        // Выбор графика работы
                        cy.get(`input[name="label-radio"][value="${schedule}"]`).check({force: true}); // Выбор графика работы
                        cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > textarea`).type(requirements); // Заполнение поля требований
                        cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(6) > div > textarea`).type(responsibilities); // Заполнение обязанностей

                        // Отправка формы
                        cy.get(`body > div:nth-child(9) > div.desktop-modal > div > div.vacancy-add-form-wrapper > form > div.form__buttons > div > button`).click({force: true}); // Замените на ваш селектор для кнопки отправки

                        // Открытие окна создания вакансии для следующей итерации
                        cy.get(`#app > div.page > div > div.page-navigation > div.page-nav__mobile > div:nth-child(6) > section > div.vacancies-block__filters-wrapper > button`).click();
                    });
                });
            });
        });
    });
});