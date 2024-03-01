/* eslint-disable react/prop-types */
import { memo, useState } from 'react'
import { Button } from '@mui/material'
import xlsx from 'json-as-xlsx'
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
    padding: 10
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderCollapse: 'collapse',
    marginTop: 10
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableHeaderCell: {
    backgroundColor: '#f8f9fa',
    color: '#495057',
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dee2e6'
  },
  tableCell: {
    padding: 8,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dee2e6'
  }
})

const PDFComp = ({ title, columns, rows }) => (
  <Document
    title={title}
    author="Your Name"
    subject="Subject"
    keywords={['keyword1', 'keyword2']}
    creator="Creator"
    producer="Producer"
    language="en"
    orientation="landscape" // Aquí se especifica la orientación horizontal
  >
    <Page style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          {columns.map(column => (
            <Text key={column.id} style={styles.tableHeaderCell}>{column.label}</Text>
          ))}
        </View>
        {rows.map(row => (
          <View key={row.id} style={styles.tableRow}>
            {columns.map(column => (
              <Text key={`${row.id}-${column.id}`} style={styles.tableCell}>{row[column.id]}</Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

const CreateExcel = ({
  type = 'excel', // or pdf
  title = 'MySpreadsheet',
  columns,
  rows,
  icon = 'fa-regular fa-file-excel'
}) => {
  const [loading, setLoading] = useState(false)
  const fecha = new Date()
  const handleDownload = async () => {
    try {
      if (type === 'pdf') {
        const blob = await pdf(<PDFComp title={title} columns={columns} rows={rows > 0 ? rows : []} />).toBlob()

        saveAs(blob, `${title}-${fecha.toLocaleDateString()}.pdf`)
      } else if (type === 'excel') {
        const data = [
          {
            sheet: title,
            columns: columns.map(column => ({ label: column.label, value: column.id })),
            content: rows
          }
        ]

        const settings = {
          fileName: `${title}-${fecha.toLocaleDateString()}`,
          writeMode: 'writeFile',
          writeOptions: {}
        }

        xlsx(data, settings)
      }
      setLoading(true)
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo descargar el archivo'
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button
      disabled={loading}
      variant='outlined'
      onClick={handleDownload}
    >
      <i style={{
        fontSize: '21px'
      }} className={icon}></i>
    </Button>
  )
}

export default memo(CreateExcel)
