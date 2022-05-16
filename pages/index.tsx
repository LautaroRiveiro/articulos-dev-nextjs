import type { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { ReactElement, useState } from 'react'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditIcon from '@mui/icons-material/Edit'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import { Fab, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { articuloService } from '../backend/services'
import { AddFAB } from '../components/addFab'
import { Articulo, ArticuloTipo } from '../interfaces'
import { AppLayout } from '../layouts'
import { articulosAPI } from '../services'

interface Props {
  data: Articulo[]
}

const HomePage: NextPage<Props> = ({ data }) => {

  const [articulos, setArticulos] = useState<Articulo[]>(data)

  const getIcon = (tipo: ArticuloTipo): ReactElement => {
    switch (tipo) {
      case 'articulo': return <NewspaperIcon fontSize="small" />
      case 'otro': return <ChatOutlinedIcon fontSize="small" />
      case 'video': return <OndemandVideoIcon fontSize="small" />
    }
  }

  const handleDelete = async (id: string) => {
    await articulosAPI.remove(id)
    setArticulos(articulos.filter(articulo => articulo._id !== id))
  }

  const handleAdd = (articulo: Articulo) => {
    setArticulos([...articulos, articulo])
  }

  return (
    <AppLayout>
      <TableContainer component={Paper} sx={{ my: { xs: 3, md: 6 } }}>
        <Table size="small" sx={{ minWidth: 500 }}>
          <TableBody>
            {articulos.map(articulo => (
              <TableRow
                key={articulo._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right" size="small" sx={{ minWidth: 25, maxWidth: 25 }}>
                  {getIcon(articulo.tipo)}
                </TableCell>
                <TableCell sx={{ flexGrow: 1 }}>
                  <Link
                    href={articulo.enlace}
                    target='_blank'
                    color="inherit"
                    underline="hover"
                  >{articulo.descripcion}</Link>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption" sx={{ color: 'darkgray' }}>
                    Hace {articulo.fechaCreacion}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 100, maxWidth: 100 }}>
                  <NextLink href={`/articulo/${articulo._id}`} passHref>
                    <IconButton color="primary" size="small" aria-label="edit">
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </NextLink>
                  <IconButton color="error" size="small" aria-label="delete" onClick={() => handleDelete(articulo._id)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddFAB onAdd={handleAdd} />
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

  const articulos: Articulo[] = await articuloService.getAll()

  return {
    props: {
      data: JSON.parse(JSON.stringify(articulos))
    }
  }
}

export default HomePage
