import { ArticuloModel, IArticulo } from "./models"

const seedData: IArticulo[] = [
  {
    descripcion: 'Generador de grid online',
    enlace: 'https://cssgrid-generator.netlify.app/',
    fechaCreacion: Date.now() - 1000000,
    tipo: "otro"
  },
  {
    descripcion: 'Alternativa a uuid más liviana',
    enlace: 'https://github.com/ai/nanoid',
    fechaCreacion: Date.now() - 20000,
    tipo: "otro"
  },
  {
    descripcion: 'Seguridad web',
    enlace: 'https://www.youtube.com/playlist?list=PL1y1iaEtjSYiiSGVlL1cHsXN_kvJOOhu-',
    fechaCreacion: Date.now() - 100000,
    tipo: "video"
  },
]

export default seedData