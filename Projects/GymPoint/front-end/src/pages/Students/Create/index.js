import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

import { Form, Input } from '@rocketseat/unform'
import { MdCheck, MdArrowBack } from 'react-icons/md'

import api from '../../../services/api'

import {
  Container,
  PageHeader,
  Button,
  StudentsForm,
  BottomInputs,
} from '../../_layouts/Form/styles'

export default function StudentForm({ history }) {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O email é obrigatório'),
    age: Yup.number()
      .typeError('Favor digitar idade valida')
      .required('A idade é obrigatória'),
    weight: Yup.number()
      .typeError('Favor digitar peso valido')
      .required('O peso é obrigatório'),
    height: Yup.number()
      .typeError('Favor digitar altura valida')
      .required('A altura é obrigatória'),
  })

  async function handleSubmit(data) {
    try {
      await api.post('students', data)

      toast.success('Usuario incluido com sucesso')
      history.push('/students/list')
    } catch (error) {
      toast.error('Erro ao incluir usuario, verifique os dados')
    }
  }

  return (
    <Container>
      <PageHeader>
        <h1>Cadastro de aluno</h1>
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
        <Form schema={schema} id="studentForm" onSubmit={handleSubmit}>
          <div>
            <p>NOME COMPLETO</p>
            <Input name="name" placeholder="ex. Joao Silva" />
          </div>
          <div>
            <p>ENDEREÇO DE E-MAIL</p>
            <Input
              name="email"
              type="email"
              placeholder="ex. example@mail.com"
            />
          </div>

          <BottomInputs>
            <div>
              <p>IDADE</p>
              <Input name="age" placeholder="ex. 21" />
            </div>
            <div>
              <p>PESO(em kg)</p>
              <Input name="weight" placeholder="ex. 72.5" />
            </div>
            <div>
              <p>ALTURA</p>
              <Input name="height" placeholder="ex. 1.72" />
            </div>
          </BottomInputs>
        </Form>
      </StudentsForm>
    </Container>
  )
}
