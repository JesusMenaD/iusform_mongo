/* eslint-disable react/prop-types */
import { Alert, Collapse } from '@mui/material'

export const AlertaCollapse = ({ title = 'Titulo', active = true, severity = 'info' }) => {
  const sx = { mb: 2 }
  return (
    <Collapse in={active}>
      <Alert sx={sx} severity={severity}>
        {title}
      </Alert>
    </Collapse>
  )
}
