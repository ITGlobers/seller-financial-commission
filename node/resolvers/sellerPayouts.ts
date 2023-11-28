interface SearchPayoutReportParams {
  sellerId: string
  dates: {
    startDate: string
    endDate: string
  }
  pagination: {
    page: number
    pageSize: number
  }
}

export async function searchPayoutReport(
  _: unknown,
  params: { searchPayoutReportParams: SearchPayoutReportParams },
  {
    clients: { marketplace, affiliate },
    vtex: { account: sellerAccount, workspace },
  }: Context
) {
  const marketplaceAccount = await affiliate.getMarketplaceName()

  const marketplaceReference = {
    account: marketplaceAccount,
    workspace,
  }

  const filter = {
    ...params.searchPayoutReportParams.dates,
    ...params.searchPayoutReportParams.pagination,
  }

  return marketplace.payoutsBySeller(
    sellerAccount,
    marketplaceReference,
    filter
  )
}
