// const { response } = require("../../../../part4/bloglist/app")

describe('Bloglist App', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('front page can be opened', () => {
    cy.visit('')
    cy.contains('Bloglist')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })
    it('fails with wrong credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('wrongtestuser')
      cy.get('#password').type('wrongtestpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })
    it('A blog can be created', () => {
      cy.createBlog({
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test-URL.com',
        likes: 0
      })
      cy.contains('Test Title Test Author')
    })
    it('A blog can be liked', () => {
      cy.createBlog({
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test-URL.com',
        likes: 0
      })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })

  it('User can delete a blog', () => {
    cy.login({ username: 'testuser', password: 'testpassword' })
    cy.createBlog({
      title: 'Test Title',
      author: 'Test Author',
      url: 'Test-URL.com',
      likes: 0
    })
    cy.contains('view').click()
    cy.contains('remove').click()
    cy.contains('Test Title Test Author').should('not.exist')
  })

  describe('New User Added', async () => {
    beforeEach(() => {
      const user2 = {
        name: 'Test User2',
        username: 'testuser2',
        password: 'testpassword2'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
      cy.visit('')
    })
    it('Only the user who create a blog can see the remove button', () => {      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.createBlog({
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test-URL.com',
        likes: 0
      })
      cy.contains('logout').click()

      cy.contains('login').click()
      cy.get('#username').type('testuser2')
      cy.get('#password').type('testpassword2')
      cy.get('#login-button').click()

      cy.wait(1000)
      cy.contains('view').click()
      cy.get('#remove-button').should('not.be.visible')    })
  })

  describe('Multiple Blogs Added', () => {
    beforeEach(() => {
      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.createBlog({
        title: 'Test Title 1',
        author: 'Test Author 1',
        url: 'Test-URL.com',
        likes: 0
      })
      cy.createBlog({
        title: 'Test Title 2',
        author: 'Test Author 2',
        url: 'Test-URL.com',
        likes: 5
      })
      cy.createBlog({
        title: 'Test Title 3',
        author: 'Test Author 3',
        url: 'Test-URL.com',
        likes: 10
      })
    })
    it('blogs are ordered by likes', () => {
      cy.get('.blog').eq(0).should('contain', 'Test Title 3')
      cy.get('.blog').eq(1).should('contain', 'Test Title 2')
      cy.get('.blog').eq(2).should('contain', 'Test Title 1')
    })
  })
})