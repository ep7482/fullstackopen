describe('Bloglist App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', () => {
    cy.visit('http://localhost:5173')
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
})