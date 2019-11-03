import React from 'react'
import PropTypes from 'prop-types'

function TechItem({ tech, onDelete }) {
  console.log(tech)
  return (
    <li >
      {tech}
      <button type='button' onClick={onDelete}>Remove</button>
    </li>
  )
}

TechItem.defaultProps = {
  tech: 'Tecnologia Oculta'
}

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
}

export default TechItem