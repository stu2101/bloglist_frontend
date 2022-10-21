describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'test',
            username: 'test',
            password: 'test'
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get("#usernameInput")
        cy.get("#passwordInput")
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get("#usernameInput").type("test")
            cy.get("#passwordInput").type("test")
            cy.contains("login").click();
            cy.contains("test logged in")
            cy.get("#logoutButton")
        })

        it('fails with wrong credentials', function () {
            cy.get("#usernameInput").type("test")
            cy.get("#passwordInput").type("wrong")
            cy.contains("login").click();

            cy.get(".error")
                .contains("Wrong username or password")
                .should('have.css', 'color', 'rgb(139, 0, 0)')

            cy.get('html').should('not.contain', 'test logged in')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: "test", password: "test" })
            cy.createBlog({ title: "first blog", author: "test", url: "test" })
            cy.createBlog({ title: "second blog", author: "test", url: "test" })
        })

        it('a blog can be created', function () {
            cy.get("html")
                .should("not.contain", "another blog")

            cy.contains("new blog").click()

            cy.get(".inputTitle").type("another blog")
            cy.get(".inputAuthor").type("test")
            cy.get(".inputUrl").type("test")
            cy.get(".buttonCreate").click()

            cy.get(".notification")
                .contains("Blog added successfully")

            cy.contains("another blog")
        })


    })
})