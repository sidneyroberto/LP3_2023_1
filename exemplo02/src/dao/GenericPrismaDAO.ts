import { PrismaClient } from '@prisma/client'

import { IGenericDAO } from './IGenericDAO'

export class GenericPrismaDAO<T> implements IGenericDAO<T> {
  private _client: PrismaClient

  constructor(client: PrismaClient) {
    this._client = client
  }

  async create(obj: T): Promise<string> {
    const result = await this._client.user
  }

  update(id: string, obj: any): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.')
  }

  find(criteria: any, options?: any): Promise<T[]> {
    throw new Error('Method not implemented.')
  }
}
