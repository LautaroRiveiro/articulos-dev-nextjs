import mongoose from 'mongoose'
import { db } from '../connection'
import { ArticuloModel, IArticulo } from '../models'
import data from '../seedData'

export const seedData = async ():Promise<void> => {
  await db.connect()
  await ArticuloModel.deleteMany()
  await ArticuloModel.insertMany(data)
  await db.disconnect()
}

export const getAll = async ():Promise<IArticulo[]> => {
  await db.connect()
  const articulos = await ArticuloModel.find({}, undefined, {lean: true}).sort({ fechaCreacion: 'ascending' })
  await db.disconnect()
  return articulos
}

export const getOne = async (id: string):Promise<IArticulo | null> => {

  if (!mongoose.isValidObjectId(id)) {
    return null
  }

  await db.connect()
  const articulo = await ArticuloModel.findById(id).lean()
  await db.disconnect()
  
  return articulo
}