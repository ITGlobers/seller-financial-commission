import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service, method } from '@vtex/api'

import clients from './clients'
import type { Clients } from './clients'
import { queries, mutations } from './resolvers'
import { ping } from './middlewares/ping'
import { getInvoiceExternalFile } from './middlewares/getInvoiceExternalFile'
import { getPayoutExternalFile } from './middlewares/getPayoutExternalFile'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes: {
    invoiceExternalFile: method({
      GET: [getInvoiceExternalFile],
    }),
    payoutReportFile: method({
      GET: [getPayoutExternalFile],
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
