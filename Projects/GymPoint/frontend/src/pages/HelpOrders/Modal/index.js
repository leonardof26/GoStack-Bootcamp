import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'react-bootstrap/Modal'

import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { Form, Input } from '@rocketseat/unform'

import { Container, Button, Question, Answer } from './styles'

import api from '../../../services/api'

export default function HelpOrderModal({ show, helpOrder, handleClose }) {
  const schema = Yup.object().shape({
    answer: Yup.string().required('Favor responder a pergunta'),
  })

  async function handleSubmit(data) {
    try {
      await api.put(`help-orders/${helpOrder.id}/answer`, data)

      toast.success('Resposta enviada com sucesso!')
      handleClose()
    } catch (error) {
      toast.error('Erro ao enviar resposta, tennte novamente!')
    }
  }

  if (!show) return null

  return (
    <Container>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pedido de auxílios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Question>
            <h3>PERGUNTA DO ALUNO</h3>
            <p>{helpOrder.question}</p>
          </Question>

          <Form onSubmit={handleSubmit} schema={schema}>
            <Answer>
              <h3>SUA RESPOSTA</h3>
              {helpOrder.answer ? (
                <p>{helpOrder.answer}</p>
              ) : (
                <Input
                  multiline
                  name="answer"
                  placeholder="Digite sua resposta aqui"
                  disabled={helpOrder.answer || false}
                  defaultValue={helpOrder.answer || ''}
                />
              )}
            </Answer>
            <Button type="submit">Responder Aluno</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

HelpOrderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  helpOrder: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ),
  handleClose: PropTypes.func.isRequired,
}

HelpOrderModal.defaultProps = {
  helpOrder: {},
}
