import { colors, createTheme } from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: colors.grey.A200
    }
  }
})