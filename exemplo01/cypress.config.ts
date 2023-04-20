import { faker } from '@faker-js/faker'
import { defineConfig } from 'cypress'
import { Db, MongoClient } from 'mongodb'

import { ContactModel } from './src/domains/ContactModel'

const DB_NAME = 'contactbook_test'
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`
let db: Db | null = null

;(async () => {
  const connection = await MongoClient.connect(DB_URL)
  db = connection.db(DB_NAME)
})()

type PopulateType = {
  lastname: string
  populationSize: number
  startDate: Date
  endDate: Date
}

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      on('task', {
        async clearContacts() {
          await db?.collection('contacts').deleteMany({})
          return null
        },

        async populateContacts({
          lastname,
          populationSize,
          startDate,
          endDate,
        }: PopulateType) {
          const size = populationSize < 2 ? 2 : populationSize
          const contactLastName = lastname ? lastname : 'Tester'
          const contactStartDate = startDate
            ? startDate
            : new Date('2010-10-10')
          const contactEndDate = endDate ? endDate : new Date('2010-10-10')

          for (let i = 0; i < size; i++) {
            const name =
              i < size / 2
                ? faker.name.fullName({ lastName: contactLastName })
                : faker.name.fullName()

            const birthday =
              i < size / 2
                ? faker.date.between(contactStartDate, contactEndDate)
                : faker.date.birthdate()

            const contact = new ContactModel({
              name,
              email: faker.internet.email(name),
              birthday,
              phone: faker.phone.number('(##) #####-####'),
            })

            await db?.collection('contacts').insertOne(contact)
          }

          return null
        },
      })
    },
  },
  video: false,
})
