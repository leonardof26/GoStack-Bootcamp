import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MdAdd, MdCheckCircle } from 'react-icons/md'
import api from '../../../services/api'

import { Container, PageHeader, StudentList } from '../../_layouts/List/styles'

export default function MembershipsList() {
  const [membershipsList, setMembershipList] = useState([])

  useEffect(() => {
    async function getPlansList() {
      const response = await api.get('/membership')

      setMembershipList(response.data)
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
        <h1>Gerenciando matrículas</h1>
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

      <div className="teste">
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
                <td>{membership.start_date}</td>
                <td>{membership.end_date}</td>
                <td>
                  <MdCheckCircle
                    size={20}
                    color={membership.active ? '#42CB59' : '#DDDDDD'}
                  />
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/memberships/${membership.id}/modify`,
                      state: { membership },
                    }}
                  >
                    EDITAR
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeleteMembership(membership.id)}
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
