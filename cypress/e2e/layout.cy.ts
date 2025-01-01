describe('layout test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Asserts layout', () => {
    cy.get("[data-test='app-title']").should('contain.text', 'Task Manager')
  })
})
