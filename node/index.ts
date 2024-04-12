import type { ParamsContext } from '@vtex/api'
import { Service, method } from '@vtex/api'

import clients from './clients'
import type { Clients } from './clients'
import { queries, mutations } from './resolvers'
import { ping } from './middlewares/ping'
import { getInvoiceExternalFile } from './middlewares/getInvoiceExternalFile'
import { getPayoutExternalFile } from './middlewares/getPayoutExternalFile'
import { errorHandler } from './middlewares/errorHandler'
import setApplicationSettings from './middlewares/setApplicationSettings'

export default new Service<Clients, State, ParamsContext>({
  clients,
  routes: {
    invoiceExternalFile: method({
      GET: [errorHandler, setApplicationSettings, getInvoiceExternalFile],
    }),
    payoutReportFile: method({
      GET: [errorHandler, setApplicationSettings, getPayoutExternalFile],
    }),
    ping: method({
      POST: [ping],
    }),
  },
  graphql: {
    resolvers: {
      Query: {
        ...queries,
      },
      Mutation: {
        ...mutations,
      },
    },
  },
})
