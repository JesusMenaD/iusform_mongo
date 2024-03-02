import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'

// import './styles.css';

Quill.register('modules/imageResize', ImageResize)

const Editor = ({ placeholder, handleValue }) => {
  const [editorHtml, setEditorHtml] = useState('')

  useEffect(() => {
  }, [])

  const handleChange = (html) => {
    setEditorHtml(html)
    console.log(html)
    handleValue(html)
  }

  return (
    <ReactQuill
      theme={'snow'}
      onChange={handleChange}
      value={editorHtml}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={'#root'}
      placeholder={placeholder}
    />
  )
}
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

export default Editor