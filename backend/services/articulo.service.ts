import { db } from '../connection'
import { ArticuloModel } from '../models'
import data from '../seedData'

export const seedData = async ():Promise<void> => {
  await db.connect()
  await ArticuloModel.deleteMany()
  await ArticuloModel.insertMany(data)
  await db.disconnect()
}