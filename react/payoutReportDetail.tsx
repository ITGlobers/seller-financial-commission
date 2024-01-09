import React from 'react'
import { payoutDetail as PayoutDetail } from 'obi.components-financial-commission'

import GET_PAYOUT from './graphql/getPayout.gql'

const PayoutReportDetail = () => {
  return <PayoutDetail payoutQuery={GET_PAYOUT} />
}

export default PayoutReportDetail
