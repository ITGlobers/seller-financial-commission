import { InvoiceFilterParams } from '../typings/custom'

export const sellerInvoices = async (
  _: unknown,
  params: InvoiceFilterParams,
  ctx: Context
) => {
  const {
    vtex: { account: sellerAccount, workspace },
    clients: { marketplace, affiliate },
  } = ctx

  const marketplaceAccount = await affiliate.getMarketplaceName()

  const marketplaceReference = {
    account: marketplaceAccount,
    workspace,
  }

  const filter = {
    ...params.sellerInvoiceParams.dates,
    ...params.sellerInvoiceParams.pagination,
  }

  const invoices: any = await marketplace.invoicesBySeller(
    sellerAccount,
    marketplaceReference,
    filter
  )

  invoices.data = invoices.data.map((invoice: any) => {
    const { id, invoiceCreatedDate, jsonData } = invoice

    const { sapCommissionId, orders } = JSON.parse(jsonData)

    const isOutbound =
      orders[0].items[0].positionType === 'outbound' ? 'Rechnung' : 'Gutschrift'

    const newId = `${id.split('_')[0]}_${invoiceCreatedDate.replace(
      /-/g,
      ''
    )}_${sapCommissionId}_${isOutbound}`

    return {
      ...invoice,
      columnId: {
        href: id,
        idVisible: newId,
      },
      downloadFiles: {
        id,
        sellerName: invoice.seller.name,
        sellerId: invoice.seller.id,
      },
    }
  })

  return invoices
}
