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
        // root: {
        //   color: '#c89211'
        // },
        contained: {
          backgroundColor: '#c89211',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#c89211'
          }
        },
        outlined: {
          color: '#c89211',
          borderColor: '#c89211',
          '&:hover': {
            backgroundColor: '#c89211',
            color: '#fff'
          },
          '&:active': {
            backgroundColor: '#c89211',
            color: '#fff'
          }
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
    },
    MuiChip: {
      styleOverrides: {
        root: {
        },
        colorPrimary: {
          backgroundColor: '#4caf50',
          color: '#fff'
        },
        colorError: {
          backgroundColor: '#FF5100',
          color: '#fff'
        },
        colorSecondary: {
          backgroundColor: '#c89211',
          color: '#fff'
        },
        colorInfo: {
          backgroundColor: '#6571ff',
          color: '#fff'
        },
        colorSuccess: {
          backgroundColor: '#6571ff',
          color: '#fff'
        },
        colorWarning: {
          backgroundColor: '#6571ff',
          color: '#fff'
        }
      }
    }
  }
})
