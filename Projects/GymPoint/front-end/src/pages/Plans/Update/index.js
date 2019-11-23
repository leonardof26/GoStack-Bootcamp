import React, { useMemo, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

import InputMask from 'react-input-mask'
import { Form, Input, useField } from '@rocketseat/unform'
import { MdCheck, MdArrowBack } from 'react-icons/md'
import { formatPrice } from '../../../util/format'

import api from '../../../services/api'

import {
  Container,
  PageHeader,
  Button,
  StudentsForm,
  BottomInputs,
} from '../../_layouts/Form/styles'

export default function StudentForm({ history, location }) {
  const { plan } = useMemo(() => location.state, [location])

  const [planName, setPlanName] = useState('')
  const [duration, setDuration] = useState('')
  const [monthlyPrice, setMonthlyPrice] = useState('')
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
      await api.put(`plans/${plan.id}`, data)

      toast.success('Plano incluido com sucesso')
      history.push('/plans/list')
    } catch (error) {
      toast.error('Erro ao incluir plano, verifique os dados')
    }
  }

  useEffect(
    () =>
      setTotalPrice(
        formatPrice(
          !isNaN(duration) && !isNaN(monthlyPrice) ? duration * monthlyPrice : 0
        )
      ),
    [duration, monthlyPrice]
  )

  useEffect(() => {
    setMonthlyPrice(plan.price)
    setDuration(plan.duration)
    setPlanName(plan.title)
  }, [plan.price, plan.duration, plan.title])

  return (
    <Container>
      <PageHeader>
        <h1>Edição de planos</h1>
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
            <Input
              name="title"
              placeholder="ex. Start"
              onChange={e => setPlanName(e.target.value)}
              value={planName}
            />
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
              <Input
                name="price"
                placeholder="ex. R$120.12"
                onChange={e => setMonthlyPrice(e.target.value)}
                value={monthlyPrice}
              />
            </div>
            <div>
              <p>PREÇO TOTAL</p>
              <Input
                name="totalPrice"
                disabled
                value={totalPrice}
                onChange={e => setTotalPrice(e.target.value)}
              />
            </div>
          </BottomInputs>
        </Form>
      </StudentsForm>
    </Container>
  )
}
