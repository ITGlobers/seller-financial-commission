import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { detail as Detail } from 'obi.components-financial-commission'

import SELLER_ORDERS from './graphql/sellerOrders.gql'
import CREATE_INVOICE from './graphql/createInvoice.gql'
import SELLER_INVOICES from './graphql/sellerInvoices.gql'
import GET_PAYOUT_REPORTS from './graphql/getPayoutReports.gql'

function CommissionDetail() {
  const { account } = useRuntime()

  return (
    <Detail
      account={account}
      ordersQuery={SELLER_ORDERS}
      invoiceMutation={CREATE_INVOICE}
      invoicesQuery={SELLER_INVOICES}
      payoutReportsQuery={GET_PAYOUT_REPORTS}
    />
  )
}

export default CommissionDetail
