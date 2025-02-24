export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const quotationId = (await params).id
  return <div>Quotation: {quotationId}</div>
}
