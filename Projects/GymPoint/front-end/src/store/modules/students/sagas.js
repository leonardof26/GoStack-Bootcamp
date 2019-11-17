import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import api from '../../../services/api'

import { deleteStudentSuccess, studentOperationFailure } from './actions'

export function* deleteStudent({ payload }) {
  try {
    console.tron.log(payload)
    const { id } = payload

    console.tron.log('jjjjjj')
    console.tron.log(id)

    yield call(api.delete, `students/${id}`)

    toast.success('Perfil excluido com sucesso')

    yield put(deleteStudentSuccess())
  } catch (error) {
    toast.error('Erro ao deletar aluno')
    console.tron.log(error.response)
    yield put(studentOperationFailure())
  }
}

export default all([
  takeLatest('@students/DELETE_STUDENT_REQUEST', deleteStudent),
])
