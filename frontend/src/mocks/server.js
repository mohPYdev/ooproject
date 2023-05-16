import {setupServer} from 'msw/node'
import {hadlers} from './handlers'
export const server = setupServer(...handlers)