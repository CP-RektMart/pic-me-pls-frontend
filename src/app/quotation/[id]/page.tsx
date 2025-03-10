'use server'

import { client } from '@/api/client'
import { type QuotationStatus } from '@/types/quotation'

import CustomerQuotation from '@/components/customer-quotation/index'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const quotationId = (await params).id

  const { response, data } = await client.GET('/api/v1/quotations/{id}', {
    params: { path: { id: quotationId } },
  })

  if (response.status !== 200) {
    return <div></div>
  }

  const quotation = data?.result

  if (!quotation || !quotation.fromDate || !quotation.toDate) {
    return <div></div>
  }

  console.log(data)

  // const mockData = {
  //   status: 'Pending',
  //   packageName: 'Package A',
  //   photographer: {
  //     name: 'Pattapol K.',
  //     imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
  //   },
  //   customerName: 'Chanotai K.',
  //   from: '20/02/2025 14:00',
  //   to: '20/02/2025 19:00',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas augue tortor, luctus eget laoreet et, interdum fringilla urna. ',
  //   duration: 5,
  //   totalPrice: 2000,
  //   images: [
  //     {
  //       url: 'https://thedaily.case.edu/wp-content/uploads/2023/06/underwater-view.jpg',
  //       name: 'Ocean',
  //     },
  //     {
  //       url: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       name: 'Forrest',
  //     },
  //     {
  //       url: 'https://www.allaboutbirds.org/news/wp-content/uploads/2024/05/549985061-Rufous_Hummingbird-Nathan_Wall.jpg',
  //       name: 'Hummingbird',
  //     },
  //     {
  //       url: 'https://media.newyorker.com/photos/660fe3deaba0b51c65382288/master/w_2240,c_limit/Galchen-Eclipse.jpg',
  //       name: 'Solar Eclipse',
  //     },
  //     {
  //       url: 'https://media.istockphoto.com/id/1224025134/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A2%E0%B8%B0%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%81%E0%B8%99%E0%B8%B4%E0%B8%A7%E0%B8%A2%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%81.jpg?s=1024x1024&w=is&k=20&c=r52awidhEO6DXvup515015SCZxavSK2Q-G7OExsLRMU=',
  //       name: 'Steak',
  //     },
  //   ],
  // }

  const formatDate = (date: string) => {
    if (!date) {
      return ''
    }
    return new Date(date)
      .toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(/,/g, '')
  }

  const calculateDuration = (fromDate: string, toDate: string): number => {
    const from = new Date(fromDate)
    const to = new Date(toDate)
    const durationInHours = (to.getTime() - from.getTime()) / (1000 * 60 * 60)
    return Math.ceil(durationInHours)
  }

  const duration = calculateDuration(quotation.fromDate, quotation.toDate)

  const images = quotation.package?.media?.map((media) => ({
    url: media.pictureUrl || '',
    name: media.description || '',
  }))

  return (
    <CustomerQuotation
      quotationId={quotationId}
      quotationStatus={quotation.status as QuotationStatus}
      packageName={quotation.package?.name || 'Package'}
      photographerName={quotation.photographer?.name || 'Photographer'}
      customerName={quotation.customer?.name || 'Customer'}
      from={formatDate(quotation.fromDate)}
      to={formatDate(quotation.toDate)}
      description={quotation.description || ''}
      duration={duration}
      totalPrice={quotation.price || 0}
      photographerImageUrl={quotation.photographer?.profilePictureUrl || ''}
      packageNumber={5}
      quotationImages={images || []}
    />
  )
}
