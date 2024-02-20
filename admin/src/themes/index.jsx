import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#c89211'
    },
    secondary: {
      main: '#FF5100'
    },
    // error: {
    //   main: '#B5B5BD'
    // },
    // warning: {
    //   main: '#B5B5BD'
    // },
    info: {
      main: '#6571ff'
    },
    // success: {
    //   main: '#B5B5BD'
    // },
    white: {
      main: '#FFFFFF'
    },
    grey: {
      main: '#B5B5BD',
      text: '#7987A1'
    }

  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '14px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#FAFAFA',
          //  sin borderradio
          borderRadius: '10px',
          //  sin borde
          border: 'none'
        }
      }

    }

  }
})
