import createSagaMiddleware from 'redux-saga'
import createStore from './createStore'

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

const sagaMonnitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null

const sagaMiddlewares = createSagaMiddleware({ sagaMonnitor })

const middlewares = [sagaMiddlewares]

const store = createStore(rootReducer, middlewares)

sagaMiddlewares.run(rootSaga)

export default store
