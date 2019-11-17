import produce from 'immer'

const INITIAL_STATE = {
  profile: null,
}

export default function students(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      default:
    }
  })
}
