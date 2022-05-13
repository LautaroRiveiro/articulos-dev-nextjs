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