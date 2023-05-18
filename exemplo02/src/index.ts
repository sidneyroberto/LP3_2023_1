import { PrismaClient } from '@prisma/client'

import { UserDAO } from './dao/prisma/UserDAO'
import { User } from './models/User'

const run = async () => {
  const client = new PrismaClient()
  const dao = new UserDAO(client)

  const user1 = new User(
    'Dwight Schrute',
    'dwight@dundermifflin.com',
    new Date('1970-01-20')
  )

  const id = await dao.create(user1)
  console.log(`ID: ${id}`)

  let user = await dao.findOne(id)
  console.log(user)

  const updated = await dao.update(id, {
    email: 'salesman_number1@dundermifflin.com',
  })
  console.log(`Atualizado: ${updated}`)

  user = await dao.findOne(id)
  console.log(user)

  // select * from user where lower(name) like lower('%dwight%')
  const users = await dao.find({
    name: {
      contains: 'dwight',
      mode: 'insensitive',
    },
  })
  console.log(users)

  //   const deleted = await dao.delete(id)
  //   console.log(`Removido: ${deleted}`)

  console.log('Mal feito desfeito')
}

run()
