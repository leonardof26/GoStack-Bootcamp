import React from 'react'
import { Text } from 'react-native'

import Background from '~/components/Background'
import TInput from '~/components/Input'
import Button from '~/components/Button'

// import { Container } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Text>Ola</Text>

      <TInput icon="call" placeholder="Digite um telefone" />
      <Button>Entrar</Button>
    </Background>
  )
}
