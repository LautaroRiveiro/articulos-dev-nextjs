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

export const create = async (data:IArticulo):Promise<IArticulo> => {
  
  try {
    // Aunque le mande un objeto vacío, null o undefined va a crear la instancia con su _id.
    // El problema lo tendré recién al querer guardar.
    // (Si mando un req.body vacío, su typeof va a ser un string y va a lanzar error)
    const articulo = new ArticuloModel(data)
    articulo.fechaCreacion = Date.now()

    await db.connect()
    // Si no están todos los campos requeridos o no son válidos lanza error
    await articulo.save()
    return articulo
  } finally {
    await db.disconnect()
  }
  
}

export const edit = async (id:string, data:Partial<IArticulo>):Promise<IArticulo | null> => {
  
  try {
    await db.connect()
    const articulo = await ArticuloModel.findByIdAndUpdate(id, data, {returnDocument: 'after', lean: true})
    return articulo
  } finally {
    await db.disconnect()
  }

}

export const remove = async (id:string):Promise<IArticulo | null> => {
  
  if (!mongoose.isValidObjectId(id)) {
    return null
  }

  try {
    await db.connect()
    const articulo = await ArticuloModel.findByIdAndRemove(id).lean()
    return articulo
  } finally {
    await db.disconnect()
  }
  

}