import React from 'react'
import { createContext, useReducer, useEffect } from 'react'
import { render, renderHook } from '@testing-library/react'
import { AuthContextProvider } from './context/AuthContext'
export const AuthContext = createContext()
import { useAuthContext } from './hooks/useAuthContext'


const customRender = (ui, { providerProps, ...renderOptions }) =>
  // render(ui, {wrapper: AuthContextProvider, ...options})


  render(
    <AuthContextProvider>
      <AuthContext.Provider {...providerProps}>
        {ui}
      </AuthContext.Provider>
    </AuthContextProvider>
    , renderOptions)

const customRenderHook = (ui, options ) =>
  renderHook(ui, {wrapper:  AuthContextProvider, ...options})
// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
export { customRenderHook as renderHook }
