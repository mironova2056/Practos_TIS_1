describe('View vacancy test', () => {
    let testData;

    const items = {
        mainPage:{
            vacancyButton:`#app > div.page > header:nth-child(1) > nav > a:nth-child(1)`,
        },
        vacancyPage:{
            searchField:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.vacancies-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > input`,
            buttonSearch:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.vacancies-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > button`,
            radioAny:`input[type="radio"][value="Любой"]`,
            radioRange:`input[type="radio"][value="По диапазону"]`,
            inputRange1:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.vacancies-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div:nth-child(3) > div:nth-child(1) > div > input`,
            inputRange2:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.vacancies-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div:nth-child(3) > div:nth-child(2) > div > input`,
            radioAgreement:`input[type="radio"][value="По договорённости"]`,
            selectSchedule:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.vacancies-block__filters-wrapper > div > div.filters-block__filter-list > div:nth-child(3) > div > div`,
            selectType:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.vacancies-block__filters-wrapper > div > div.filters-block__filter-list > div:nth-child(4) > div > div`,
            buttonReset:`#app > div.page > div > section > div > div.vacancies-block__vacancies-filters-wrapper > div.vacancies-block__filters-wrapper > div > div.filters-block__filter-list > div.custom-modal-mobile__buttons > button`,
        },
    };

    beforeEach(() => {
        cy.fixture('search.json').then((data) => {
            testData = data;
            cy.visit(testData.url);
            cy.get(items.mainPage.vacancyButton).should('be.visible');
            cy.get(items.mainPage.vacancyButton).click();
        });
    });

    it('Проверка поиска', () => {

        cy.get(items.vacancyPage.searchField).should('be.visible');
        cy.get(items.vacancyPage.searchField).type(testData.searchField)

        cy.get(items.vacancyPage.buttonSearch).should('be.visible');
        cy.get(items.vacancyPage.buttonSearch).click();

    });

    it('Проверка чек-бокса "Любой"', () => {
        cy.get(items.vacancyPage.radioAny).should('be.visible');
        cy.get(items.vacancyPage.radioAny).click();
    });

    it('Проверка чек-бокса "По договоренности"', () => {
        cy.get(items.vacancyPage.radioAgreement).should('be.visible');
        cy.get(items.vacancyPage.radioAgreement).click();
    });

    it('Проверка чек-бокса "По диапазону" существующее значение', () => {
        cy.get(items.vacancyPage.radioRange).should('be.visible');
        cy.get(items.vacancyPage.radioRange).click();

        cy.get(items.vacancyPage.inputRange1).should('be.visible');
        cy.get(items.vacancyPage.inputRange1).type(testData.range1True)

        cy.get(items.vacancyPage.inputRange2).should('be.visible');
        cy.get(items.vacancyPage.inputRange2).type(testData.range2True)
    });

    it('Проверка чек-бокса "По диапазону" несуществующее значение', () => {
        cy.get(items.vacancyPage.radioRange).should('be.visible');
        cy.get(items.vacancyPage.radioRange).click();

        cy.get(items.vacancyPage.inputRange1).should('be.visible');
        cy.get(items.vacancyPage.inputRange1).type(testData.range1False)

        cy.get(items.vacancyPage.inputRange2).should('be.visible');
        cy.get(items.vacancyPage.inputRange2).type(testData.range2False)
    });

    it('Проверка селект-списка "График работы"', () => {
        cy.get(items.vacancyPage.selectSchedule).should('be.visible');
        cy.get(items.vacancyPage.selectSchedule).click();

        cy.log('1 значение');
        cy.get(items.vacancyPage.selectSchedule).should('be.visible');
        cy.contains(testData.selectScheduleOption1).click();
        cy.get(items.vacancyPage.selectSchedule).should('contain', testData.selectScheduleOption1)

        cy.log('2 значение');
        cy.get(items.vacancyPage.selectSchedule).should('be.visible');
        cy.get(items.vacancyPage.selectSchedule).click();
        cy.contains(testData.selectScheduleOption2).click();
        cy.get(items.vacancyPage.selectSchedule).should('contain', testData.selectScheduleOption2);


        cy.log('3 значение');
        cy.get(items.vacancyPage.selectSchedule).should('be.visible');
        cy.get(items.vacancyPage.selectSchedule).click();
        cy.contains(testData.selectScheduleOption3).click();
        cy.get(items.vacancyPage.selectSchedule).should('contain', testData.selectScheduleOption3);
    });

    it('Проверка селект-списка "Тип занятости"', () => {
        cy.get(items.vacancyPage.selectType).should('be.visible');
        cy.get(items.vacancyPage.selectType).click();

        cy.log('1 значение');
        cy.get(items.vacancyPage.selectType).should('be.visible');
        cy.contains(testData.selectTypeOption1).click();
        cy.get(items.vacancyPage.selectType).should('contain', testData.selectTypeOption1)

        cy.log('2 значение');
        cy.get(items.vacancyPage.selectType).should('be.visible');
        cy.get(items.vacancyPage.selectType).click();
        cy.contains(testData.selectTypeOption2).click();
        cy.get(items.vacancyPage.selectType).should('contain', testData.selectTypeOption2);

        cy.log('3 значение');
        cy.get(items.vacancyPage.selectType).should('be.visible');
        cy.get(items.vacancyPage.selectType).click();
        cy.contains(testData.selectTypeOption3).click();
        cy.get(items.vacancyPage.selectType).should('contain', testData.selectTypeOption3);

        cy.log('4 значение');
        cy.get(items.vacancyPage.selectType).should('be.visible');
        cy.get(items.vacancyPage.selectType).click();
        cy.contains(testData.selectTypeOption4).click();
        cy.get(items.vacancyPage.selectType).should('contain', testData.selectTypeOption4);

    });

    it('Проверка сброса фильтров', () => {
        cy.get(items.vacancyPage.buttonReset).should('be.visible');
        cy.get(items.vacancyPage.buttonReset).click();
    });
});