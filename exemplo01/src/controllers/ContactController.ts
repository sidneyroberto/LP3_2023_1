import { Request, Response } from 'express'
import { validateContactInputs, ContactModel } from '../domains/ContactModel'
import { ContactDAO } from '../dao/ContactDAO'

export class ContactController {
  private _contactDAO: ContactDAO

  constructor() {
    this._contactDAO = new ContactDAO()
  }

  async save(req: Request, res: Response) {
    const errorMessages = validateContactInputs(req.body)

    if (errorMessages.length == 0) {
      const { name, email, phone, birthday } = req.body

      const contact = new ContactModel({
        name,
        email,
        phone,
        birthday: new Date(birthday),
      })

      const savedContact = await this._contactDAO.save(contact)
      return res.status(201).json({ contact: savedContact })
    }

    return res.status(400).json({ errorMessages })
  }
}
