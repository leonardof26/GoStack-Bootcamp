import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import reactoTronSaga from 'reactotron-redux-saga'
import AsyncStorage from '@react-native-community/async-storage'

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .use(reactotronRedux())
    .use(reactoTronSaga())
    .connect()

  tron.clear()

  console.tron = tron
}
