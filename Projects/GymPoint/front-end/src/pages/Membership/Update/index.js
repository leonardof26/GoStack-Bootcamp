import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { format, parseISO, addMonths } from 'date-fns'

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

export default function MembershipUpdate({ history, location }) {
  const membership = useMemo(
    () => ({
      ...location.state.membership,
      endDateFormatted: format(
        parseISO(location.state.membership.end_date),
        'dd/MM/yyyy'
      ),
    }),
    [location]
  )

  const [plansList, setPlansList] = useState([])
  const [studentsList, setStudentsList] = useState([])
  const [plan, setPlan] = useState(membership.Plan.id)
  const [initDate, setInitDate] = useState(parseISO(membership.start_date))
  const [finalDate, setFinalDate] = useState(membership.endDateFormatted)
  const [totalPrice, setTotalPrice] = useState(formatPrice(membership.price))

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

  const initialData = {
    student: membership.Student.name,
    initialDate: parseISO(membership.start_date),
  }

  const schema = Yup.object().shape({
    student: Yup.number()
      .typeError('Favor escolha um estudante')
      .required('Favor escolha um estudante'),
    plan: Yup.string().required('O plano é obrigatório'),
    initialDate: Yup.date()
      .typeError('Favor selecionar data de inicio')
      .required('Favor selecionar data de inicio'),
  })

  async function handleSubmit(data) {
    const { student } = data

    const reqBody = {
      studentId: student,
      planId: plan,
      startDate: data.initialDate,
    }

    try {
      await api.put(`/membership/${membership.id}`, reqBody)

      toast.success('Matricula alterada com sucesso')

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
          initialData={initialData}
        >
          <div>
            <p>ALUNO</p>
            <AsyncReactSelect
              name="student"
              defaultValue={{
                value: membership.Student.id,
                label: membership.Student.name,
              }}
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
                defaultValue={{
                  value: membership.Plan.id,
                  label: membership.Plan.title,
                }}
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

MembershipUpdate.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
}
