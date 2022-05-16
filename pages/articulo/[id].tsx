import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { style } from '@mui/system'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { articuloService } from '../../backend/services'
import { Articulo, ArticuloTipo } from '../../interfaces'
import { AppLayout } from '../../layouts'
import { articulosAPI } from '../../services'

interface Props {
  articulo: Articulo
}

type Params = {
  id: string
}

const tipos: { value: ArticuloTipo, label: string }[] = [
  { value: 'articulo', label: 'Artículo' },
  { value: 'video', label: 'Video' },
  { value: 'otro', label: 'Otro' }
]

export const ArticuloPage: NextPage<Props> = (props) => {

  const [articulo, setArticulo] = useState<Articulo>(props.articulo)
  const router = useRouter()

  const handleChangeTipo = (event: ChangeEvent<HTMLInputElement>) => {
    setArticulo({ ...articulo, tipo: event.target.value as ArticuloTipo })
  }

  const handleChangeDescripcion = (event: ChangeEvent<HTMLInputElement>) => {
    setArticulo({ ...articulo, descripcion: event.target.value })
  }

  const handleChangeEnlace = (event: ChangeEvent<HTMLInputElement>) => {
    setArticulo({ ...articulo, enlace: event.target.value })
  }

  const handleAceptar = async (event: MouseEvent<HTMLButtonElement>) => {
    await articulosAPI.update(articulo)
    router.push('/')
  }

  return (
    <AppLayout>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          my: 4,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: '900px'
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h1">
          Editar artículo
        </Typography>

        <TextField
          select
          label="Tipo"
          value={articulo.tipo}
          onChange={handleChangeTipo}
          variant="standard"
        >
          {tipos.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Descripción"
          variant="standard"
          value={articulo.descripcion}
          onChange={handleChangeDescripcion}
        />

        <TextField
          label="Enlace"
          variant="standard"
          value={articulo.enlace}
          onChange={handleChangeEnlace}
        />

        <Button
          variant='contained'
          color='primary'
          onClick={handleAceptar}
          disabled={articulo.tipo === null || !articulo.descripcion || !articulo.enlace}
        >
          Actualizar
        </Button>
      </Paper>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const { id } = context.query

  const articulo = await articuloService.getOne(id as string)
  if (!articulo) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      articulo: JSON.parse(JSON.stringify(articulo))
    }
  }
}

export default ArticuloPage