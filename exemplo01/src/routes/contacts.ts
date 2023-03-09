import { Router } from 'express'
import { ContactController } from '../controllers/ContactController'

export const contactsRouter = Router()
const contactCtrl = new ContactController()

/**
 * O código abaixo pode apresentar problema de
 * binding (ligação/clonagem de funções)
 *
 *
 * contactsRouter.post('/', contactCtrl.save)
 */
contactsRouter.post('/', (req, res) => contactCtrl.save(req, res))
