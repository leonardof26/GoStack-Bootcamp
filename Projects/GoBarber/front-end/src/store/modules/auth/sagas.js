import { takeLatest, call, put, all } from 'redux-saga/effects'

import { signInSuccess } from './actions'

import api from '~/services/api'
import history from '~/services/history'

export function* signIn({ payload }) {
  console.tron.error('jdwje')
  const { email, password } = payload
  console.tron.error(email)
  console.tron.error(password)

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    })

    console.tron.log(response)
    console.tron.log('fdgds')

    const { token, user } = response.data

    if (!user.provider) {
      console.tron.error('Only users can logIn')
      return
    }

    yield put(signInSuccess(token, user))
  } catch (error) {
    console.tron.error(error.response)
  }

  history.push('/dashboard')
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)])
