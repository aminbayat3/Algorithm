import { compose, createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware) => Boolean(middleware));

const compoesedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; 

const compoesedEnhancers = compoesedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    rootReducer,
  undefined,
  compoesedEnhancers
);

sagaMiddleware.run(rootSaga);