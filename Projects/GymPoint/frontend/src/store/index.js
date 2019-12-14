import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import createStore from './createStore'
import persistedReducers from './persistReducers'

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

const sagaMonnitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null

const sagaMiddlewares = createSagaMiddleware({ sagaMonnitor })

const middlewares = [sagaMiddlewares]

const store = createStore(persistedReducers(rootReducer), middlewares)
const persistor = persistStore(store)

sagaMiddlewares.run(rootSaga)

export { store, persistor }
