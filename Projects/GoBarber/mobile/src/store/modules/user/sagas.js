import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'

import api from '~/services/api'

import { updateProfileSuccsess, updateProfileFailure } from './actions'

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data

    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    )

    const response = yield call(api.put, 'users', profile)

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso')

    yield put(updateProfileSuccsess(response.data))
  } catch (error) {
    Alert.alert(
      'Erro ao atualizar perfil',
      'Erro ao atualizar perfil, confira seus dados'
    )

    yield put(updateProfileFailure())
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)])
