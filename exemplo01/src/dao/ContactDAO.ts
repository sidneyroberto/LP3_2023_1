import { Contact, ContactModel } from '../domains/ContactModel'

export class ContactDAO {
  async save(contact: Contact) {
    const savedContact = await ContactModel.create(contact)
    return savedContact
  }
}
