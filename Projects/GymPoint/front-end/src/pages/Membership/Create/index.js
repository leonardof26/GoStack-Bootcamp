import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { format, addMonths } from 'date-fns'

import { toast } from 'react-toastify'

import { Form } from '@rocketseat/unform'
import { MdCheck, MdArrowBack } from 'react-icons/md'
import DatePicker from '../../../components/Unform/DatePicker'
import ReactSelect from '../../../components/Unform/ReactSelect'
import AsyncReactSelect from '../../../components/Unform/AsyncReactSelect'

import api from '../../../services/api'
import { formatPrice } from '../../../util/format'

import {
  Container,
  PageHeader,
  Button,
  StudentsForm,
  BottomInputs,
} from '../../_layouts/Form/styles'

export default function MembershipForm({ history }) {
  const [plansList, setPlansList] = useState([])
  const [studentsList, setStudentsList] = useState([])
  const [plan, setPlan] = useState('')
  const [initDate, setInitDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState('')
  const [totalPrice, setTotalPrice] = useState('')

  useEffect(() => {
    const selectedPlan = plansList.find(item => item.id === plan)

    if (!selectedPlan) {
      return
    }

    const newFinalDate = addMonths(initDate, selectedPlan.duration)
    const newFinalPrice = selectedPlan.price * selectedPlan.duration

    setFinalDate(format(newFinalDate, 'dd/MM/yyyy'))
    setTotalPrice(formatPrice(newFinalPrice))
  }, [plan, initDate]) // eslint-disable-line

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans')

      setPlansList(response.data)
    }

    async function loadStudents() {
      const response = await api.get('students')

      setStudentsList(response.data)
    }

    loadPlans()
    loadStudents()
  }, [])

  const schema = Yup.object().shape({
    student: Yup.number().required('O nome é obrigatório'),
    plan: Yup.string().required('O plano é obrigatório'),
    initialDate: Yup.date().required('O plano é obrigatório'),
  })

  async function handleSubmit(data) {
    const { student } = data

    const reqBody = {
      studentId: student,
      planId: plan,
      startDate: data.initialDate,
    }

    try {
      await api.post(`/membership`, reqBody)

      toast.success('Matricula incluida com sucesso')

      history.push('/memberships/list')
    } catch (error) {
      toast.error(
        'Erro ao atulizar matricula. Verifique se o aluno não tem outra matricula ativa'
      )
    }
  }

  return (
    <Container>
      <PageHeader>
        <h1>Edição de matrícula</h1>
        <aside>
          <Button backGround="#ccc">
            <Link to="/memberships/list">
              <div>
                <MdArrowBack color="#fff" size={16} />
                <span>VOLTAR</span>
              </div>
            </Link>
          </Button>

          <Button backGround="#ee4d64" type="submit" form="dataForm">
            <div>
              <MdCheck color="#fff" size={16} />
              <span>SALVAR</span>
            </div>
          </Button>
        </aside>
      </PageHeader>

      <StudentsForm>
        <Form
          schema={schema}
          id="dataForm"
          onSubmit={handleSubmit}
          initialData={{ initialDate: initDate }}
        >
          <div>
            <p>ALUNO</p>
            <AsyncReactSelect
              name="student"
              defaultOptions={studentsList.map(item => ({
                value: item.id,
                label: item.name,
              }))}
              options={studentsList.map(item => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>

          <BottomInputs>
            <div className="inputField">
              <p>PLANO</p>
              <ReactSelect
                name="plan"
                options={plansList.map(item => ({
                  value: item.id,
                  label: item.title,
                }))}
                onChange={option => setPlan(option.value)}
              />
            </div>
            <div className="inputField">
              <p>DATA DE INÍCIO</p>
              <DatePicker
                name="initialDate"
                change={date => setInitDate(date)}
              />
            </div>
            <div className="inputField">
              <p>DATA DE TÉRMINO</p>
              <input type="text" value={finalDate} disabled />
            </div>
            <div className="inputField">
              <p>VALOR FINAL</p>
              <input type="text" value={totalPrice} disabled />
            </div>
          </BottomInputs>
        </Form>
      </StudentsForm>
    </Container>
  )
}

MembershipForm.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
}
