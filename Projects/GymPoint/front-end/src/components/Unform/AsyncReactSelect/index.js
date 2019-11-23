import React, { useRef, useEffect } from 'react'
import AsyncSelect from 'react-select/async'

import { useField } from '@rocketseat/unform'

export default function ReactSelect({ name, label, options, teste, ...rest }) {
  const ref = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.select.state.value

    return selectValue ? selectValue.value : ''
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select.state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue()
      },
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  function filterItens(inputValue) {
    return options.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  function loadOptions(inputValue) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(filterItens(inputValue))
      }, 1000)
    })
  }

  function getDefaultValue() {
    if (!defaultValue) return null

    return [options.find(option => option.label === defaultValue)]
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        name={fieldName}
        aria-label={fieldName}
        cacheOptions
        loadOptions={loadOptions}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  )
}
