import React, { useState, useEffect, useMemo, useCallback } from 'react'

function App() {
  const [techs, setTechs] = useState([])
  const [techInput, setTechInput] = useState('')

  const hanndleAdd = useCallback(() => {
    setTechs([...techs, techInput])
    setTechInput('')
  }, [techInput, techs])

  useEffect(() => {
    const tech = localStorage.getItem('techsList')

    if (tech) {
      setTechs(JSON.parse(tech))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('techsList', JSON.stringify(techs))
  }, [techs])

  const techSize = useMemo(() => techs.length, [techs])

  return (
    <div className="App">
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnlogias </strong> <br />
      <input
        type="text"
        onChange={e => setTechInput(e.target.value)}
        value={techInput}
      />
      <button type="button" onClick={hanndleAdd}>
        Adicionar
      </button>
    </div>
  )
}

export default App
