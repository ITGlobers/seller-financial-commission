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
    const { id } = invoice

    return {
      ...invoice,
      columnId: {
        href: id,
        idVisible: id,
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
