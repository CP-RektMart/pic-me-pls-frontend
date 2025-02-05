import { Upload } from 'lucide-react'

export default function ImageUpload() {
  return (
    <div>
      <div className='h-40 cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 transition-colors'>
        <div className='flex h-full flex-col items-center justify-center gap-2'>
          <Upload className='mx-auto' size={24} color='#62748E' />
          <p className='text-sm font-medium text-slate-500'>
            Upload your citizen card
          </p>
        </div>
      </div>
    </div>
  )
}
