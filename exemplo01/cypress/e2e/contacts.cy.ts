let requestOptions: Partial<Cypress.RequestOptions> = {
  method: 'POST',
  url: '/contacts',
  failOnStatusCode: false,
}

describe('Tests over /contacts path', () => {
  before(() => {
    this.fixtures = new Map<string, any>()
    ;[
      'contact',
      'invalidNameContact',
      'invalidEmailContact',
      'invalidPhoneContact',
      'invalidBirthdayContact',
    ].forEach((name) => {
      cy.fixture(name).then((value) => {
        this.fixtures.set(name, value)
      })
    })
  })

  beforeEach(() => {
    cy.task('clearContacts')
  })

  it('should save a valid contact', () => {
    requestOptions.body = this.fixtures.get('contact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(201)
      const { contact } = body
      expect(contact._id).to.not.null
    })
  })

  it('should not save a contact with invalid name', () => {
    requestOptions.body = this.fixtures.get('invalidNameContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Name cannot be empty')
    })
  })

  it('should not save a contact with invalid email', () => {
    requestOptions.body = this.fixtures.get('invalidEmailContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Invalid email')
    })
  })

  it('should not save a contact with invalid phone', () => {
    requestOptions.body = this.fixtures.get('invalidPhoneContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal(
        'Phone must have following pattern: (00) 00000-0000'
      )
    })
  })

  it('should not save a contact with invalid birthday', () => {
    requestOptions.body = this.fixtures.get('invalidBirthdayContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Birthday must be previous to today')
    })
  })
})
