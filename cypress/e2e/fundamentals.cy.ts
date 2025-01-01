describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
