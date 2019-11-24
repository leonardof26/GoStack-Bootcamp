import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MdAdd, MdSearch, MdArrowBack, MdArrowForward } from 'react-icons/md'
import { Form, Input } from '@rocketseat/unform'
import api from '../../../services/api'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
  Pagination,
} from '../../_layouts/List/styles'

export default function List() {
  const [studentsList, setStudentsList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)

  async function getStudentsList(page) {
    const response = await api.get(`students/${page}`)

    setStudentsList(response.data.slice(0, 10))

    if (response.data.length < 11) {
      setLastPage(true)
      return
    }

    setLastPage(false)
  }

  useEffect(() => {
    getStudentsList(1)
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

  async function handleNextPage() {
    if (lastPage) return
    getStudentsList(currentPage + 1)
    setCurrentPage(currentPage + 1)
  }

  async function handlePreviousPage() {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
    getStudentsList(currentPage - 1)
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
                      onClick={() =>
                        window.confirm(
                          'Tem certeza que deseja excluir o usuário?'
                        ) && handleDeleteUser(student.id)
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
