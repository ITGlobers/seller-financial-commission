import { getInvoice } from './getInvoice'
import { getTemplate } from './getTemplate'
import { sendEmail } from './sendEmail'
import { createInvoice } from './createInvoice'
import { sellerInvoices } from './sellerInvoices'
import { sellerOrders } from './sellerOrders'
import { searchPayoutReport } from './sellerPayouts'
import { getPayout } from './getPayoutById'
import { resolversWrapper } from '../utils/resolversWrapper'

export const queries = resolversWrapper({
  sellerInvoices,
  getInvoice,
  sellerOrders,
  getTemplate,
  searchPayoutReport,
  getPayout,
})

export const mutations = resolversWrapper({
  createInvoice,
  sendEmail,
})
