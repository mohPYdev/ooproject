import { configureStore } from '@reduxjs/toolkit'
import authSlice from './actions'
import {api} from '../services/WebApi'
const store = configureStore({
  reducer: {
    authentication: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})
export default store;


