import { Alert } from 'react-native'
import { takeLatest, call, put, all } from 'redux-saga/effects'

import { signInSuccess, signFailure } from './actions'

import api from '~/services/api'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços'
      )
      return
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    // history.push('/dashboard')
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no Login, verifique seus dados'
    )
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    })

    // history.push('/')
  } catch (error) {
    Alert.alert(
      'Erro no cadastro',
      'Falha na criação de usuário, verifique seus dados'
    )
    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  api.defaults.headers.Authorization = `Bearer ${token}`
}

export function signOut() {
  // history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])
