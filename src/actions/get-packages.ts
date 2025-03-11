export interface Package {
  id: number
  name: string
  packageDescription: string
  price: number
}

export function getPackages() {
  return [
    {
      id: 1,
      name: 'Wedding Package',
      packageDescription: 'Wedding photography package',
      price: 400,
    },
    {
      id: 2,
      name: 'Birthday Package',
      packageDescription: 'Birthday photography package',
      price: 300,
    },
    {
      id: 3,
      name: 'Graduation Package',
      packageDescription: 'Graduation photography package',
      price: 200,
    },
  ]
}
