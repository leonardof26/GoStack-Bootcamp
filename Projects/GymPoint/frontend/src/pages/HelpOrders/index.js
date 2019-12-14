import React, { useState, useEffect } from 'react'

import { MdCheckCircle, MdArrowBack, MdArrowForward } from 'react-icons/md'

import api from '../../services/api'

import HelpOrderModal from './Modal'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
  Pagination,
} from '../_layouts/List/styles'

export default function HelpOrder() {
  const [helpOrderList, setHelpOrderList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)

  const resultsPerPage = 10

  async function getHelpOrderList(page) {
    const response = await api.get(`/help-orders/${page}/${resultsPerPage}`)

    setHelpOrderList(response.data.slice(0, resultsPerPage))

    if (response.data.length <= resultsPerPage) {
      setLastPage(true)
      return
    }

    setLastPage(false)
  }

  useEffect(() => {
    getHelpOrderList(1)
  }, [])

  function handleOpenModal(question) {
    setSelectedQuestion(question)
    setShowModal(true)
  }

  async function handleNextPage() {
    if (lastPage) return
    getHelpOrderList(currentPage + 1)
    setCurrentPage(currentPage + 1)
  }

  async function handlePreviousPage() {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
    getHelpOrderList(currentPage - 1)
  }

  function handleCloseModal() {
    setShowModal(false)
    getHelpOrderList(currentPage)
  }

  return (
    <Container>
      <PageHeader>
        <h1>Pedidos de Auxílio</h1>
      </PageHeader>

      <div className="tableContent">
        <StudentList>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>Respondida</th>
            </tr>
          </thead>
          <tbody>
            {helpOrderList.map(order => (
              <tr key={order.id}>
                <td>{order.Student.name}</td>
                <td>
                  <MdCheckCircle
                    size={20}
                    color={order.answer ? '#42CB59' : '#DDDDDD'}
                  />
                </td>
                <td>
                  <Buttons>
                    <button
                      className="modalButton"
                      type="button"
                      onClick={() => handleOpenModal(order)}
                    >
                      responder
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

      <HelpOrderModal
        show={showModal}
        handleClose={handleCloseModal}
        helpOrder={selectedQuestion}
      />
    </Container>
  )
}
