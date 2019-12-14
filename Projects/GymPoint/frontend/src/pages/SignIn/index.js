import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import logo from '../../assets/logo-baixo.svg'
import { signInRequest } from '../../store/modules/auth/actions'

import { Container, Menu } from './styles'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail vá lido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
})

export default function SignIn() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  return (
    <Container>
      <Menu>
        <img src={logo} alt="GoBarber" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>SEU E-MAIL</strong>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <strong>SUA SENHA</strong>
          <Input name="password" type="password" placeholder="********" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Entrar no sistema'}
          </button>
        </Form>
      </Menu>
    </Container>
  )
}
