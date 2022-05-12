import { NextApiRequest, NextApiResponse } from 'next'
import { articuloService } from '../../../backend/services'

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch(req.method) {
    case 'GET':
      return seedData(res)
    default:
      return res.status(400).json({ message: 'Method no válido' })
  }  

}

const seedData = async (res: NextApiResponse<Data>) => {
  try {
    await articuloService.seedData()
    return res.status(200).json({ message: 'Proceso realizado correctamente' })
  } catch (error) {
    return res.status(500).end()
  }
}