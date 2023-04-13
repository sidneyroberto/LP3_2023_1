describe('Tests over /contacts path', () => {
  it('should save a valid contact', () => {
    const contact = {
      name: 'Sidney Sousa',
      email: 'sidney@email.com',
      phone: '(99) 99999-9999',
      birthday: '2004-02-29',
    }

    cy.request({
      method: 'POST',
      url: '/contacts',
      body: contact,
    }).then(({ body, status }) => {
      expect(status).to.equal(201)
      const { contact } = body
      expect(contact._id).to.not.null
    })
  })
})
