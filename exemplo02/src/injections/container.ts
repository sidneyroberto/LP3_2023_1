import { Container } from 'inversify'
import { Db, MongoClient } from 'mongodb'

import { IUserDAO } from '../dao/IUserDAO'
import { UserDAO } from '../dao/mongodb/UserDAO'
import { TYPES } from './types'

export const getContainer = async () => {
  const container = new Container()

  // const client = new PrismaClient()
  // container.bind<IUserDAO>(TYPES.IUserDAO).to(UserDAO)
  // container.bind<PrismaClient>(TYPES.DbConnector).toConstantValue(client)

  const connection = await MongoClient.connect('mongodb://localhost')
  const db = connection.db('authdb')
  container.bind<Db>(TYPES.DbConnector).toConstantValue(db)

  container.bind<IUserDAO>(TYPES.IUserDAO).to(UserDAO)

  return container
}
