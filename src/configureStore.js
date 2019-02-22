import { createStore, applyMiddleware } from 'redux'
import promiseResolver from './middlewares/promiseResolver'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(promiseResolver, loggerMiddleware)
  )
}
