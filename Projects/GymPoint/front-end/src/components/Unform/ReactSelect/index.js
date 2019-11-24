import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import { useField } from '@rocketseat/unform'

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value
    if (!multiple) {
      return selectValue ? selectValue.value : ''
    }

    return selectValue ? selectValue.map(option => option.id) : []
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue()
      },
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  )
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  multiple: PropTypes.bool,
}

ReactSelect.defaultProps = {
  label: '',
  multiple: false,
}
