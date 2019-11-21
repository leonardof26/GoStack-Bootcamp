import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MdAdd, MdSearch } from 'react-icons/md'
import { Form, Input } from '@rocketseat/unform'
import api from '../../../services/api'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
} from '../../_layouts/List/styles'

export default function List() {
  const [studentsList, setStudentsList] = useState([])

  useEffect(() => {
    async function getStudentsList() {
      const response = await api.get('/students')

      setStudentsList(response.data)
    }

    getStudentsList()
  }, [])

  async function filerStudentByName(data) {
    const { name } = data
    const response = await api.get(`/students/${name}`)

    setStudentsList(response.data)
  }

  async function handleDeleteUser(id) {
    await api.delete(`students/${id}`)

    setStudentsList(studentsList.filter(student => student.id !== id))
  }

  return (
    <Container>
      <PageHeader>
        <h1>Gerenciando Alunos</h1>
        <aside>
          <div className="AddButton">
            <Link to="/students/new">
              <div>
                <MdAdd color="#fff" size={16} />
                <span>CADASTRAR</span>
              </div>
            </Link>
          </div>

          <div className="SearchInput">
            <Form onSubmit={filerStudentByName}>
              <button type="submit">
                <MdSearch color="#444444" size={16} />
              </button>
              <Input name="name" type="text" placeholder="Buscar Aluno" />
            </Form>
          </div>
        </aside>
      </PageHeader>

      <div className="tableContent">
        <StudentList>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Buttons>
                    <Link
                      to={{
                        pathname: `/students/${student.id}/modify`,
                        state: { student },
                      }}
                    >
                      EDITAR
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteUser(student.id)}
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
