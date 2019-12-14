import React, { useState } from 'react'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { signInRequest } from '../../store/modules/auth/actions'

import logo from '../../assets/logo-baixo.png'

import { Container, Form, Input, StandartButton } from './styles'

export default function SignIn() {
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)

  function handleSubmit() {
    dispatch(signInRequest(userId))
  }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <Input
          keyboardType="numeric"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={userId}
          onChangeText={setUserId}
        />
        <StandartButton onPress={handleSubmit} loading={loading}>
          Entrar no sistema
        </StandartButton>
      </Form>
    </Container>
  )
}
