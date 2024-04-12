import type { RecorderState, ServiceContext } from '@vtex/api'
import type { Clients } from '../clients'
import { MiddlewareLog } from './middlewareLog'
import { ApplicationSettings } from './applicationSettings'

declare global {
  interface State extends RecorderState {
    logs: MiddlewareLog[]
    appSettings: ApplicationSettings
  }

  type Context = ServiceContext<Clients, State>
}

export {}
