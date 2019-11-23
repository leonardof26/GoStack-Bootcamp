import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { format, parseISO } from 'date-fns'

import { MdAdd, MdCheckCircle } from 'react-icons/md'
import api from '../../../services/api'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
} from '../../_layouts/List/styles'

export default function MembershipsList() {
  const [membershipsList, setMembershipList] = useState([])

  useEffect(() => {
    async function getPlansList() {
      const response = await api.get('/membership')

      setMembershipList(
        response.data.map(membership => ({
          ...membership,
          formattedStartDate: format(
            parseISO(membership.start_date),
            'dd/MM/yyyy'
          ),
          formattedEndDate: format(parseISO(membership.end_date), 'dd/MM/yyyy'),
        }))
      )
    }

    getPlansList()
  }, [])

  async function handleDeleteMembership(id) {
    await api.delete(`membership/${id}`)

    setMembershipList(membershipsList.filter(student => student.id !== id))
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
                          'Tem certeza que deseja excluir o usuário?'
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
    </Container>
  )
}
