export function deleteStudentRequest(id) {
  return {
    type: '@students/DELETE_STUDENT_REQUEST',
    payload: { id },
  }
}

export function deleteStudentSuccess(students) {
  return {
    type: '@students/DELETE_STUDENT_SUCCESS',
    payload: { students },
  }
}

export function studentOperationFailure() {
  return {
    type: '@students/STUDENT_FAILURE',
  }
}
