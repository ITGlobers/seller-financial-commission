import { ExternalLogSeverity } from '../typings/externalLogMetadata'
import applicationSettingsParser from '../utils/applicationSettingsParser'

async function setApplicationSettings(
  ctx: Context,
  next: () => Promise<void>
): Promise<void> {
  const {
    state: { logs },
  } = ctx

  try {
    ctx.state.appSettings = applicationSettingsParser(ctx.vtex.settings)

    await next()
  } catch (e) {
    const { message, stack } = e as Error

    logs.push({
      message: 'Error while getting the application setttings',
      middleware: 'Middlewares/Set Application Settings',
      severity: ExternalLogSeverity.ERROR,
      payload: {
        details: message,
        stack,
      },
    })
  }
}

export default setApplicationSettings
