import { Router } from 'express'
import { ContactController } from '../controllers/ContactController'

export const contactsRouter = Router()
const contactCtrl = new ContactController()

/**
 * O código abaixo pode apresentar problema de
 * binding (ligação/clonagem de funções), pois é
 * feita apenas uma cópia do método save, sem a
 * cópia completa do objeto contactCtrl:
 *
 * contactsRouter.post('/', contactCtrl.save)
 *
 * Para resolver este problema, alterei o código
 * acima para este código que está em execução.
 * Alternativamente, é possível realizar o binding
 * explícito do objeto contactCtrl:
 * contactsRouter.post('/', contactCtrl.save.bind(contactCtrl))
 */
contactsRouter.post('/', (req, res) => contactCtrl.save(req, res))
