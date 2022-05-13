import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Head from 'next/head';
import { FC, PropsWithChildren } from 'react'

interface Props {
  title?: string;
}

export const AppLayout: FC<PropsWithChildren<Props>> = ({ title = 'Artículos web', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AppBar position="static" elevation={0} color='primary'>
        <Toolbar>
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
            }}
          >
            Artículos Web
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        {children}
      </main>
    </>
  )
}