import { NextApiRequest, NextApiResponse } from 'next'
import { IArticulo } from '../../../backend/models'
import { articuloService } from '../../../backend/services'

type Data =
| { message: string; }
| IArticulo

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getOne(req, res)

    case 'PUT':
      return edit(req, res)

    case 'DELETE':
      return remove(req, res)
  
    default:
      return res.status(400).send({message: 'Method not valid'})
  }
}

const getOne = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query
    const articulo = await articuloService.getOne(id as string)
    if (articulo) {
      return res.status(200).json(articulo)
    }
    return res.status(404).json({message: 'Articulo no encontrado'})
  } catch (error) {
    return res.status(500).end()
  }
}

const edit = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  
  if (typeof req.body !== 'object') {
    return res.status(400).json({message: 'Faltan los parámetros'})
  }

  try {
    const articulo = await articuloService.edit(id as string, req.body)
    if (articulo) {
      return res.status(200).json(articulo)
    }
    return res.status(404).json({message: 'No existe el artículo'})
  } catch (error) {
    return res.status(500).end()    
  }

}

const remove = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  const { id } = req.query

  try {
    const articulo = await articuloService.remove(id as string)
    if ( articulo ) {
      return res.status(200).json({message: 'Artículo eliminado correctamente'})
    }
    return res.status(404).json({message: 'Artículo no encontrado'})
  } catch (error) {
    return res.status(500).end()
  }

}