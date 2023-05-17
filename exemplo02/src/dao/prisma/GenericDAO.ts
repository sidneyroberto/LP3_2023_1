import { IGenericDAO } from '../IGenericDAO'

export class GenericDAO<T> implements IGenericDAO<T> {
  private _model: any

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

    return updatedObj != null && updatedObj != undefined
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
