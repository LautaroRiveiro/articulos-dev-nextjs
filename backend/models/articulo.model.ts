import mongoose, { Schema } from "mongoose"

export interface IArticulo {
  descripcion: string;
  enlace: string;
  fechaCreacion: number;
  tipo: IArticuloTipo;
}

type IArticuloTipo = 'video' | 'articulo' | 'otro'

const schema = new Schema<IArticulo>({
  descripcion: { type: String, required: true },
  enlace: { type: String, required: true },
  fechaCreacion: { type: Number },
  tipo: {
    type: String,
    enum: {
      values: [ 'video', 'articulo', 'otro' ],
      message: '{VALUE} no es un tipo permitido'
    }
  }
})

export const ArticuloModel = mongoose.models.Articulo || mongoose.model<IArticulo>('Articulo', schema)