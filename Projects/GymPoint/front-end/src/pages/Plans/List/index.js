import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md'
import api from '../../../services/api'
import { formatPrice } from '../../../util/format'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
  Pagination,
} from '../../_layouts/List/styles'

export default function ListPlans() {
  const [plansList, setPlansList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)

  function padToTwo(num) {
    return num < 10 ? `0${num}` : num
  }

  async function getPlansList(page) {
    const response = await api.get(`/plans/actives/${page}`)

    setPlansList(
      response.data.splice(0, 10).map(plan => ({
        ...plan,
        formattedPrice: formatPrice(plan.price),
        formattedDuration: `${padToTwo(plan.duration)} meses`,
      }))
    )

    if (response.data.length < 11) {
      setLastPage(true)
      return
    }

    setLastPage(false)
  }

  useEffect(() => {
    getPlansList(1)
  }, [])

  async function handleDeletePlan(id) {
    try {
      await api.delete(`plans/${id}`)

      setPlansList(plansList.filter(student => student.id !== id))
    } catch (error) {
      console.tron.log(error.response)
    }
  }

  async function handleNextPage() {
    if (lastPage) return
    getPlansList(currentPage + 1)
    setCurrentPage(currentPage + 1)
  }

  async function handlePreviousPage() {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
    getPlansList(currentPage - 1)
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

      <Pagination>
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <MdArrowBack
            size={20}
            color={currentPage === 1 ? '#ddd' : '#ee4d64'}
          />
        </button>

        <span>{currentPage}</span>

        <button type="button" onClick={handleNextPage} disabled={lastPage}>
          <MdArrowForward size={20} color={lastPage ? '#ddd' : '#ee4d64'} />
        </button>
      </Pagination>
    </Container>
  )
}
