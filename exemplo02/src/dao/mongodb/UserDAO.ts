import { Db } from 'mongodb'

import { User } from '../../models/User'
import { GenericDAO } from './GenericDAO'

export class UserDAO extends GenericDAO<User> {
  constructor(db: Db) {
    super(db, 'users')
  }
}
