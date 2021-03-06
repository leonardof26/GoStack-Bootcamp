import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

import { Form, Input } from '@rocketseat/unform'
import { MdCheck, MdArrowBack } from 'react-icons/md'
import { formatPrice } from '../../../util/format'
import MaskInput from '../../../components/Unform/MaskInput'

import api from '../../../services/api'

import {
  Container,
  PageHeader,
  Button,
  StudentsForm,
  BottomInputs,
} from '../../_layouts/Form/styles'

export default function PlanCreate({ history }) {
  const [duration, setDuration] = useState()
  const [monthlyPrice, setMonthlyPrice] = useState()
  const [totalPrice, setTotalPrice] = useState('')

  const schema = Yup.object().shape({
    title: Yup.string().required('O nome é obrigatório'),
    duration: Yup.number()
      .typeError('Favor digitar duração valida')
      .required('A duração é obrigatória'),
    price: Yup.number()
      .typeError('Favor digitar preço valido')
      .required('O preço é obrigatório'),
  })

  async function handleSubmit(data) {
    try {
      await api.post('plans', data)

      toast.success('Plano incluido com sucesso')
      history.push('/plans/list')
    } catch (error) {
      toast.error('Erro ao incluir plano, verifique os dados')
    }
  }

  useEffect(() => {
    const duartionNum = parseInt(duration, 10)
    const priceNum = parseFloat(monthlyPrice, 10)

    setTotalPrice(
      formatPrice(typeof duartionNum && priceNum ? duartionNum * priceNum : 0)
    )
  }, [duration, monthlyPrice])

  return (
    <Container>
      <PageHeader>
        <h1>Cadastro de planos</h1>
        <aside>
          <Button backGround="#ccc">
            <Link to="/plans/list">
              <div>
                <MdArrowBack color="#fff" size={16} />
                <span>VOLTAR</span>
              </div>
            </Link>
          </Button>

          <Button backGround="#ee4d64" type="submit" form="studentForm">
            <div>
              <MdCheck color="#fff" size={16} />
              <span>SALVAR</span>
            </div>
          </Button>
        </aside>
      </PageHeader>

      <StudentsForm>
        <Form schema={schema} id="studentForm" onSubmit={handleSubmit}>
          <div>
            <p>TÍTULO DO PLANO</p>
            <Input name="title" placeholder="ex. Start" />
          </div>

          <BottomInputs>
            <div className="inputField">
              <p>DURAÇÃO (em meses)</p>
              <Input
                name="duration"
                placeholder="ex. 12"
                onChange={e => setDuration(e.target.value)}
                value={duration}
              />
            </div>
            <div className="inputField">
              <p>PREÇO MENSAL</p>
              <MaskInput
                name="price"
                thousandSeparator
                prefix="R$"
                placeholder="ex. R$120.12"
                onValueChange={input => setMonthlyPrice(input.value)}
              />
            </div>
            <div>
              <p>PREÇO TOTAL</p>
              <Input name="totalPrice" disabled value={totalPrice} />
            </div>
          </BottomInputs>
        </Form>
      </StudentsForm>
    </Container>
  )
}
PlanCreate.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
}
