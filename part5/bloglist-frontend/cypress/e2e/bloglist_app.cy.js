describe('Bloglist App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Bloglist')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })
})