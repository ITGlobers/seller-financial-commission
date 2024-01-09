export async function getPayout(_: any, { id }: { id: string }, ctx: Context) {
  const {
    vtex: { account: sellerAccount, workspace },
    clients: { marketplace, affiliate },
  } = ctx

  const marketplaceAccount = await affiliate.getMarketplaceName()

  const marketplaceReference = {
    account: marketplaceAccount,
    workspace,
  }

  return marketplace.payoutsById(id, sellerAccount, marketplaceReference)
}
