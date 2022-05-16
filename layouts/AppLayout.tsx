import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react'

interface Props {
  title?: string;
}

export const AppLayout: FC<PropsWithChildren<Props>> = ({ title = 'Artículos web', children }) => {
  return (
    <Box sx={{ minHeight: '100vh' }} display='flex' flexDirection='column'>
      <Head>
        <title>{title}</title>
      </Head>

      <AppBar position="static" elevation={0} color='primary'>
        <Toolbar>
          <Link href='/' passHref>
            <Typography
              variant="h6"
              component="div"
              color="inherit"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Artículos Web
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Container component='main' sx={{ position: 'relative', flexGrow: 1, mb: 4 }}>
        {children}
      </Container>
    </Box>
  )
}