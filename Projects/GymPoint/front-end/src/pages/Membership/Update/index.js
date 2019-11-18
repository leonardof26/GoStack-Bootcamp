import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { format, parseISO } from 'date-fns'

import { toast } from 'react-toastify'

import { Form, Input, Choice } from '@rocketseat/unform'
import { MdCheck, MdArrowBack } from 'react-icons/md'
import DatePicker from '../../../components/Unform/DatePicker'
import ReactSelect from '../../../components/Unform/ReactSelect'
import Select from 'react-select'

import api from '../../../services/api'

import {
  Container,
  PageHeader,
  Button,
  StudentsForm,
  BottomInputs,
} from '../../_layouts/Form/styles'

export default function StudentForm({ history, location }) {
  const [plansList, setPlansList] = useState([])

  const { membership } = useMemo(() => location.state, [location])

  const initialData = {
    name: membership.Student.name,
    plan: membership.Plan.title,
    initialDate: parseISO(membership.start_date),
    endDate: format(parseISO(membership.end_date), 'dd/MM/yyyy'),
    finalPrice: membership.price,
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    plan: Yup.string().required('O plano é obrigatório'),
    initialDate: Yup.date().required('O plano é obrigatório'),
  })

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans')

      setPlansList(response.data)
    }

    loadPlans()
  }, [])

  const teste = plansList.map(plan => ({
    value: plan.title,
    label: plan.title,
  }))

  console.log(teste)

  async function handleSubmit(data) {
    console.log(data)
  }

  return (
    <Container>
      <PageHeader>
        <h1>Edição de matrícula</h1>
        <aside>
          <Button backGround="#ccc">
            <Link to="/students/list">
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
        <Form
          schema={schema}
          id="studentForm"
          onSubmit={handleSubmit}
          initialData={initialData}
        >
          <div>
            <p>ALUNO</p>
            <Input name="name" placeholder="ex. Joao Silva" />
          </div>

          <BottomInputs>
            <div className="inputField">
              <p>PLANO</p>
              <Select options={teste} />
              {/* <ReactSelect name="plan" multiple={false} options={teste} /> */}
              {/* <Input name="plan" placeholder="ex. Joao Silva" /> */}
            </div>
            <div className="inputField">
              <p>DATA DE INÍCIO</p>
              <DatePicker name="initialDate" />
            </div>
            <div className="inputField">
              <p>DATA DE TÉRMINO</p>
              <Input name="endDate" disabled />
            </div>
            <div className="inputField">
              <p>VALOR FINAL</p>
              <Input name="finalPrice" disabled />
            </div>
          </BottomInputs>
        </Form>
      </StudentsForm>
    </Container>
  )
}
