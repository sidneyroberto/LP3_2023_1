import { injectable } from 'inversify'

import { IGenericDAO } from '../IGenericDAO'

@injectable()
export class GenericDAO<T> implements IGenericDAO<T> {
  protected _model: any

  async create(obj: T): Promise<string> {
    const savedObj = await this._model.create({ data: obj })
    return savedObj.id
  }

  async update(id: string, obj: any): Promise<boolean> {
    const updatedObj = await this._model.update({
      where: {
        id: id,
      },
      data: obj,
    })

    return !!updatedObj
  }

  async delete(id: string): Promise<boolean> {
    const deletedObj = await this._model.delete({
      where: {
        id: id,
      },
    })

    return !!deletedObj
  }

  async findOne(id: string): Promise<T> {
    const obj = await this._model.findUnique({
      where: {
        id: id,
      },
    })

    return obj
  }

  async find(criteria: any, options?: any): Promise<T[]> {
    const opts = options || {}
    const results = await this._model.findMany({
      where: criteria,
      ...opts,
    })

    return results
  }
}
