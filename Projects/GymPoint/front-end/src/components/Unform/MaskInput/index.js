import React, { useRef, useEffect } from 'react'
import NumberFormat from 'react-number-format'

import { useField } from '@rocketseat/unform'

export default function MaskInput({ name, ...rest }) {
  const ref = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  function parseSelectValue(selectRef) {
    return selectRef.state.numAsString
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: pickerRef => {
        pickerRef.clear()
      },
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  return (
    <>
      <NumberFormat
        name={fieldName}
        ref={ref}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  )
}
