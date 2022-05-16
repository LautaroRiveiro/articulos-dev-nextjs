import axios from 'axios'
import { Articulo } from '../interfaces'

const api = axios.create({
  baseURL: '/api'
})

export const remove = async (id: string): Promise<void> => {
  return await api.delete('/articulos/' + id)
}

export const create = async (articulo: Partial<Articulo>): Promise<Articulo> => {
  const { data } = await api.post<Articulo>('/articulos', articulo)
  return data
}

export const update = async (articulo:Articulo): Promise<Articulo> => {
  const { data } = await api.put('/articulos/' + articulo._id, articulo)
  return data
}