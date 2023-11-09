export async function getPayoutExternalFile(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: {
        params: { id, type },
      },
      workspace,
    },
    clients: { marketplace, affiliate },
  } = ctx

  const marketplaceAccount = await affiliate.getMarketplaceName()

  const marketplaceReference = {
    account: marketplaceAccount,
    workspace,
  }

  const file = await marketplace.getPayoutExternalFile(
    id as string,
    type as string,
    marketplaceReference
  )

  ctx.status = 200
  ctx.set('Content-Type', type)
  ctx.set('Content-Disposition', `attachment; filename=${id}.${type}`)
  ctx.body = file
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
