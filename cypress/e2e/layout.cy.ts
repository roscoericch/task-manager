describe('layout test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Asserts layout', () => {
    cy.getDataByTestId('app-title').should('contain.text', 'Task Manager')
  })
})
