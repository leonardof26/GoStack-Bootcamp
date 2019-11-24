import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { format, parseISO } from 'date-fns'

import {
  MdAdd,
  MdCheckCircle,
  MdArrowBack,
  MdArrowForward,
} from 'react-icons/md'
import api from '../../../services/api'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
  Pagination,
} from '../../_layouts/List/styles'

export default function MembershipsList() {
  const [membershipsList, setMembershipList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)

  async function getMembershipList(page) {
    const response = await api.get(`/membership/${page}`)

    setMembershipList(
      response.data.slice(0, 10).map(membership => ({
        ...membership,
        formattedStartDate: format(
          parseISO(membership.start_date),
          'dd/MM/yyyy'
        ),
        formattedEndDate: format(parseISO(membership.end_date), 'dd/MM/yyyy'),
      }))
    )

    if (response.data.length < 11) {
      setLastPage(true)
      return
    }

    setLastPage(false)
  }

  useEffect(() => {
    getMembershipList(1)
  }, [])

  async function handleDeleteMembership(id) {
    await api.delete(`membership/${id}`)

    setMembershipList(membershipsList.filter(student => student.id !== id))
  }

  async function handleNextPage() {
    if (lastPage) return
    getMembershipList(currentPage + 1)
    setCurrentPage(currentPage + 1)
  }

  async function handlePreviousPage() {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
    getMembershipList(currentPage - 1)
  }

  return (
    <Container>
      <PageHeader>
        <h1>Gerenciando Matrículas</h1>
        <aside>
          <div className="AddButton">
            <Link to="/memberships/new">
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
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INICÍO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
            </tr>
          </thead>
          <tbody>
            {membershipsList.map(membership => (
              <tr key={membership.id}>
                <td>{membership.Student.name}</td>
                <td>{membership.Plan.title}</td>
                <td>{membership.formattedStartDate}</td>
                <td>{membership.formattedEndDate}</td>
                <td>
                  <MdCheckCircle
                    size={20}
                    color={membership.active ? '#42CB59' : '#DDDDDD'}
                  />
                </td>
                <td>
                  <Buttons>
                    <Link
                      to={{
                        pathname: `/memberships/${membership.id}/modify`,
                        state: { membership },
                      }}
                    >
                      EDITAR
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        window.confirm(
                          'Tem certeza que deseja excluir a matricula?'
                        ) && handleDeleteMembership(membership.id)
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
