import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MdAdd, MdCheckCircle } from 'react-icons/md'
import api from '../../../services/api'
import { formatPrice } from '../../../util/format'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
} from '../../_layouts/List/styles'

export default function ListPlans() {
  const [plansList, setPlansList] = useState([])

  function padToTwo(num) {
    return num < 10 ? `0${num}` : num
  }

  useEffect(() => {
    async function getPlansList() {
      const response = await api.get('/plans/actives')

      setPlansList(
        response.data.map(plan => ({
          ...plan,
          formattedPrice: formatPrice(plan.price),
          formattedDuration: `${padToTwo(plan.duration)} meses`,
        }))
      )
    }

    getPlansList()
  }, [])

  async function handleDeletePlan(id) {
    try {
      await api.delete(`plans/${id}`)

      setPlansList(plansList.filter(student => student.id !== id))
    } catch (error) {
      console.tron.log(error.response)
    }
  }

  return (
    <Container>
      <PageHeader>
        <h1>Gerenciando Planos</h1>
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

      <div className="tableContent">
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
                <td>{plan.formattedDuration}</td>
                <td>{plan.formattedPrice}</td>
                <td>
                  <Buttons>
                    <Link
                      to={{
                        pathname: `/plans/${plan.id}/modify`,
                        state: { plan },
                      }}
                    >
                      EDITAR
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        window.confirm(
                          'Tem certeza que deseja excluir o usuário?'
                        ) && handleDeletePlan(plan.id)
                      }
                    >
                      APAGAR
                    </button>
                  </Buttons>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentList>
      </div>
    </Container>
  )
}
