import React, { useState, useEffect } from 'react'

import { MdCheckCircle } from 'react-icons/md'

import api from '../../services/api'

import HelpOrderModal from './Modal'

import {
  Container,
  PageHeader,
  StudentList,
  Buttons,
} from '../_layouts/List/styles'

export default function HelpOrder() {
  const [helpOrderList, setHelpOrderList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState()

  useEffect(() => {
    async function getHelpOrderList() {
      const response = await api.get('/help-orders')

      setHelpOrderList(response.data)
    }

    getHelpOrderList()
  }, [showModal])

  function handleOpenModal(question) {
    setSelectedQuestion(question)
    setShowModal(true)
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

      <HelpOrderModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        helpOrder={selectedQuestion}
      />
    </Container>
  )
}
