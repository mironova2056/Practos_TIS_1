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
        workspacePage:{
            acceptButton:`#app > div.page > div > section > div.detailed-workspace-header > div > div > div > div.status-open__buttons > button:nth-child(1)`,
            rejectButton:`#app > div.page > div > section > div.detailed-workspace-header > div > div > div > div.status-open__buttons > button:nth-child(2)`,
            inputComment:`#app > div.page > div > section > section > section > div > div > div.detailed-workspace-activity-comments__menu > article > div.comment-textarea__textarea > div.form-control.form-control--max > textarea`,
            sendButton:`#app > div.page > div > section > section > section > div > div > div.detailed-workspace-activity-comments__menu > article > div.comment-textarea__textarea > div.comment-textarea__buttons > button:nth-child(2)`,
            answerButton:`#app > div.page > div > section > section > section > div > div > div.base-comment > div.base-comment__content > div.base-comment__content > div.detailed-workspace-activity-comments__actions > div:nth-child(1) > button`,
            copyButton:`#app > div.page > div > section > section > section > div > div > div.base-comment > div.base-comment__content > div.base-comment__content > div.detailed-workspace-activity-comments__actions > div:nth-child(2) > button`,
            workspaceStatus:`#app > div.page > div > section > div.detailed-workspace-header > div > div > article > div > p`,
            listComment:`#app > div.page > div > section > section > section > div > div`,
            replyComment:`#app > div.page > div > section > section > section > div > div > div.detailed-workspace-activity-comments__menu > div > div.reply-comment`,
        }
    };

    beforeEach(() => {
        cy.fixture('workspace.json').then((data) => {
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

            cy.get(items.responsesPage.workspaceButton).should('be.visible');
            cy.get(items.responsesPage.workspaceButton).click();
        });
    });

    it('Проверка отправки комментария', () => {
        cy.get(items.workspacePage.inputComment).scrollIntoView().should('be.visible');
        cy.get(items.workspacePage.inputComment).type(testData.trueComment);

        cy.get(items.workspacePage.sendButton).should('be.visible');
        cy.get(items.workspacePage.sendButton).click();

        cy.get(items.workspacePage.listComment).should('contain', testData.trueComment);
    });

    it('Проверка ответа на комментарий', () => {
        cy.get(items.workspacePage.answerButton).should('be.visible');
        cy.get(items.workspacePage.answerButton).click({multiple: true });

        cy.get(items.workspacePage.replyComment).should('be.visible')
    });

    it('Проверка копирования комментария', () => {
        cy.get(items.workspacePage.copyButton).should('be.visible');
        cy.get(items.workspacePage.copyButton).click({multiple: true });
    });

});