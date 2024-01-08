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
})