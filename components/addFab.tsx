import { ChangeEvent, FC, useState } from 'react'
import { Box, Button, Fab, MenuItem, Modal, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Articulo, ArticuloTipo } from '../interfaces'
import { articulosAPI } from '../services'

interface Props {
  onAdd?: (articulo: Articulo) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 1
}

const tipos: { value: ArticuloTipo, label: string }[] = [
  { value: 'articulo', label: 'Artículo' },
  { value: 'video', label: 'Video' },
  { value: 'otro', label: 'Otro' }
]

export const AddFAB: FC<Props> = ({ onAdd }) => {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [tipo, setTipo] = useState<ArticuloTipo | null>(null)
  const [descripcion, setDescripcion] = useState<string>('')
  const [enlace, setEnlace] = useState<string>('')

  const handleChangeTipo = (event: ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value as ArticuloTipo)
  }

  const handleChangeDescripcion = (event: ChangeEvent<HTMLInputElement>) => {
    setDescripcion(event.target.value)
  }

  const handleChangeEnlace = (event: ChangeEvent<HTMLInputElement>) => {
    setEnlace(event.target.value)
  }

  const handleCancelar = () => {
    setOpen(false)
  }

  const handleAceptar = async () => {
    const articulo = await articulosAPI.create({ tipo: tipo!, descripcion, enlace })
    setOpen(false)
    setTipo(null)
    setDescripcion('')
    setEnlace('')
    if (onAdd) {
      onAdd(articulo)
    }
  }

  return (
    <>
      <Fab
        onClick={handleOpen}
        color="primary"
        size="medium"
        aria-label="add"
        sx={{ right: 0, bottom: 0, position: 'absolute' }}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={3} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cargar nuevo artículo
          </Typography>

          <TextField
            select
            label="Tipo"
            value={tipo}
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
            value={descripcion}
            onChange={handleChangeDescripcion}
          />

          <TextField
            label="Enlace"
            variant="standard"
            value={enlace}
            onChange={handleChangeEnlace}
          />

          <Box display='flex' justifyContent='space-between' mt={4}>
            <Button
              variant='text'
              color='error'
              onClick={handleCancelar}
            >
              Cancelar
            </Button>

            <Button
              variant='contained'
              color='primary'
              onClick={handleAceptar}
              disabled={tipo === null || !descripcion || !enlace}
            >
              Crear entrada
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  )
}