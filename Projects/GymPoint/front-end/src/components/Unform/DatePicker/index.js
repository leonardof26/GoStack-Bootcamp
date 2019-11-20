import React, { useRef, useEffect, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt'

import { useField } from '@rocketseat/unform'

import 'react-datepicker/dist/react-datepicker.css'

export default function DatePicker({ name, change }) {
  const ref = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [selected, setSelected] = useState(defaultValue)

  function handleChange(date) {
    setSelected(date)
    change(date)
  }

  registerLocale('pt', pt)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear()
      },
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => handleChange(date)}
        ref={ref}
        locale="pt"
        dateFormat="dd/MM/yyyy"
      />
      {error && <span>{error}</span>}
    </>
  )
}
