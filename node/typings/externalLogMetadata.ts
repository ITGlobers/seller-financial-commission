import { MiddlewareLog } from './middlewareLog'

// eslint-disable-next-line no-restricted-syntax, no-shadow
export enum ExternalLogSeverity {
  DEBUG = 1,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
}

export type ExternalLogMetadata = {
  account: string
  workspace: string
  middleware: string
  text: string
  additionalInfo?: MiddlewareLog['payload']
  severity: ExternalLogSeverity
}
