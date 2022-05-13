import { NextApiRequest, NextApiResponse } from "next"
import { IArticulo } from "../../../backend/models";
import { articuloService } from "../../../backend/services";

type Data =
| { message: string; }
| IArticulo[]
| IArticulo

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  
  switch(req.method) {
    case 'GET':
      return getAll(res)
    
    case 'POST':
      return create(req, res)
    
    default:
      return res.status(400).json({ message: 'Method not valid' })
  }

}

const getAll = async (res: NextApiResponse<Data>) => {
  try {
    const articulos = await articuloService.getAll()
    res.status(200).json(articulos)
  } catch (error) {
    res.status(500).end()
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  if ( typeof req.body !== 'object' ) {
    res.status(400).json({ message: 'Faltan los parámetros' })
  }
  
  try {
    const articulo = await articuloService.create( req.body )
    res.status(200).json(articulo)
  } catch (error) {
    res.status(500).end()
  }
}