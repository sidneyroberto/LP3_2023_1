let requestOptions: Partial<Cypress.RequestOptions> = {
  method: 'POST',
  url: '/contacts',
  failOnStatusCode: false,
}

describe('Tests over /contacts path', () => {
  beforeEach(() => {
    cy.task('clearContacts')

    cy.fixture('contact').then((contact) => {
      this.contact = contact
    })

    cy.fixture('invalidNameContact').then((contact) => {
      this.invalidNameContact = contact
    })

    cy.fixture('invalidEmailContact').then((contact) => {
      this.invalidEmailContact = contact
    })

    cy.fixture('invalidPhoneContact').then((contact) => {
      this.invalidPhoneContact = contact
    })

    cy.fixture('invalidBirthdayContact').then((contact) => {
      this.invalidBirthdayContact = contact
    })
  })

  it('should save a valid contact', () => {
    requestOptions.body = this.contact

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(201)
      const { contact } = body
      expect(contact._id).to.not.null
    })
  })

  it('should not save a contact with invalid name', () => {
    requestOptions.body = this.invalidNameContact

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Name cannot be empty')
    })
  })

  it('should not save a contact with invalid email', () => {
    requestOptions.body = this.invalidEmailContact

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Invalid email')
    })
  })

  it('should not save a contact with invalid phone', () => {
    requestOptions.body = this.invalidPhoneContact

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal(
        'Phone must have following pattern: (00) 00000-0000'
      )
    })
  })

  it('should not save a contact with invalid birthday', () => {
    requestOptions.body = this.invalidBirthdayContact

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Birthday must be previous to today')
    })
  })
})
