import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MdAdd } from 'react-icons/md'
import api from '../../../services/api'

import { Container, PageHeader, StudentList } from '../../_layouts/List/styles'

export default function ListPlans() {
  const [plansList, setPlansList] = useState([])

  useEffect(() => {
    async function getPlansList() {
      const response = await api.get('/plans')

      setPlansList(response.data)
    }

    getPlansList()
  }, [])

  async function handleDeleteUser(id) {
    await api.delete(`students/${id}`)

    setPlansList(plansList.filter(student => student.id !== id))
  }

  return (
    <Container>
      <PageHeader>
        <h1>Gerenciando Alunos</h1>
        <aside>
          <div className="AddButton">
            <Link to="/plans/new">
              <div>
                <MdAdd color="#fff" size={16} />
                <span>CADASTRAR</span>
              </div>
            </Link>
          </div>
        </aside>
      </PageHeader>

      <div className="teste">
        <StudentList>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
            </tr>
          </thead>
          <tbody>
            {plansList.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/plans/${plan.id}/modify`,
                      state: { plan },
                    }}
                  >
                    EDITAR
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(plan.id)}
                  >
                    APAGAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentList>
      </div>
    </Container>
  )
}
