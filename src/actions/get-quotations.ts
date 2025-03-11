export interface quotation {
  quotationID: number
  status: string
  packageName: string
  photographerName: string
  customerName: string
  from: Date
  to: Date
  description: string
  pricePerHour: number
}

export const quotations: quotation[] = [
  {
    quotationID: 1,
    status: 'Pending',
    packageName: 'Wedding Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Wedding photography package',
    pricePerHour: 400,
  },
  {
    quotationID: 2,
    status: 'Confirm',
    packageName: 'Birthday Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Birthday photography package',
    pricePerHour: 300,
  },
  {
    quotationID: 3,
    status: 'Paid',
    packageName: 'Graduation Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Graduation photography package',
    pricePerHour: 200,
  },
  {
    quotationID: 4,
    status: 'Cancelled',
    packageName: 'Wedding Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Wedding photography package',
    pricePerHour: 400,
  },
]
