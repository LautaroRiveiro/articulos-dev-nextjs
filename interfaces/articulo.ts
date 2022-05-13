export interface Articulo {
  _id: string;
  descripcion: string;
  fechaCreacion: number;
  tipo: ArticuloTipo;
  enlace: string;
}

export type ArticuloTipo = 'articulo' | 'video' | 'otro'