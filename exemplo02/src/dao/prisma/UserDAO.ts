import { PrismaClient } from '@prisma/client'

import { User } from '../../models/User'
import { GenericDAO } from './GenericDAO'

export class UserDAO extends GenericDAO<User> {
  constructor(client: PrismaClient) {
    super()
    /**
     * Aqui ocorre a injeção de dependência
     */
    this._model = client.user
  }
}
