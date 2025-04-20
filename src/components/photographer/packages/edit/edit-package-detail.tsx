'use client'

import deletePackage from '@/actions/packages/delete-package'
import { MAX_FILES, MAX_FILE_SIZE } from '@/config/index'
import { Category } from '@/types/category'
import { Media } from '@/types/package'
import { Icon } from '@iconify/react'
import { useParams, useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

import { BackButton } from '@/components/back-button'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/text-area'

import { EditPackageForm } from './edit-package'

interface EditPackageDetailSectionProps {
  name: string
  description: string
  price: number
  categories: Category[]
  photoCards: Media[]
  onSubmit: (data: EditPackageForm) => Promise<void>
  form: ReturnType<typeof useForm<EditPackageForm>>
  onDrop: (acceptedFiles: File[]) => void
}

export function EditPackageDetailSection({
  onSubmit,
  form,
  onDrop,
  categories,
}: EditPackageDetailSectionProps) {
  const { packageID } = useParams()
  const router = useRouter()

  const handlePriceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(Number(value))) {
      form.setValue('price', Number(value))
    }
  }

  const handleDeletePackage = async () => {
    deletePackage(Number(packageID))
    router.push('/photographer/packages')
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: MAX_FILES,
      maxSize: MAX_FILE_SIZE,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  return (
    <div className='shadow-right space-between flex w-full flex-col gap-y-4 bg-white px-5 py-4 shadow-black/100 drop-shadow-lg lg:h-full lg:w-96'>
      <div className='flex flex-row items-center gap-4'>
        <BackButton href='/photographer/packages' />
        <h1 className='text-xl font-bold'>Edit Package</h1>
      </div>
      <FormField
        control={form.control}
        name='name'
        defaultValue=''
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Name</FormLabel>
            <FormControl>
              <Input placeholder='Package Name' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='category'
        defaultValue=''
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Category</FormLabel>
            <FormControl className='font-normal'>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                value={field.value}
              >
                <SelectTrigger className='w-full font-normal'>
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.name!}
                      value={category.id!.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='packageDescription'
        defaultValue=''
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Description</FormLabel>
            <FormControl>
              <Textarea placeholder='Description' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='price'
        defaultValue={undefined}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>
              Price Per Hour
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='&#3647; 200'
                {...field}
                onChange={handlePriceOnChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <div
          {...getRootProps()}
          className='flex max-h-10 cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg bg-zinc-50 py-2 font-medium text-zinc-900'
        >
          <Icon icon='lucide:image-up' />
          <Input {...getInputProps()} type='file' />
          {isDragActive ? (
            <p className='text-sm'>Drop the image!</p>
          ) : (
            <p className='text-sm'>Upload Photos</p>
          )}
        </div>
        {fileRejections.length !== 0 && (
          <p>Image must be less than 10 MB and of type png, jpg, or jpeg</p>
        )}
      </div>

      <Button
        className='flex max-h-10 cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg bg-zinc-50 py-2 text-zinc-900 shadow-none hover:bg-zinc-200'
        onClick={handleDeletePackage}
      >
        <Icon icon='lucide:trash-2' />
        Delete Package
      </Button>

      <div className='mt-auto'>
        <Button
          type='button'
          className='w-full hover:bg-zinc-700'
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
