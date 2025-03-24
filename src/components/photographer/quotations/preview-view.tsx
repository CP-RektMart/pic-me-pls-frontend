import { useState } from 'react'

import { createPreview } from '@/actions/quotation/create-preview'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface PreviewViewProps {
  quotationId: number
}

export function PreviewView({ quotationId }: PreviewViewProps) {
  const [albumLink, setAlbumLink] = useState('')
  const [versions, setVersions] = useState([
    'link1',
    'link2',
    'link3',
    'link4',
    'link5',
    'link1',
    'link2',
    'link3',
    'link4',
    'link5',
  ])
  const [showAddAlbumDialog, setShowAddAlbumDialog] = useState(false)

  const handleAddPreview = () => {
    // Check if the albumLink is valid
    try {
      new URL(albumLink)
      if (albumLink) {
        createPreview({ quotationId: quotationId, link: albumLink })
        setVersions([...versions, albumLink])
        setAlbumLink('')
        setShowAddAlbumDialog(false)

        toast.success('Album link added successfully!')
      }
    } catch {
      toast.error('Please enter a valid album link.')
    }
  }

  return (
    <div className='mt-5 bg-white p-6'>
      {/* Add Album Dialog */}
      <Dialog open={showAddAlbumDialog} onOpenChange={setShowAddAlbumDialog}>
        <DialogTrigger asChild>
          <Button variant='secondary' className='w-full space-x-2 px-4 py-2'>
            Add Album
          </Button>
        </DialogTrigger>

        <DialogContent className='max-h-[506px] w-11/12 gap-2 rounded-lg p-6'>
          <DialogHeader>
            <DialogTitle>Add a New Album</DialogTitle>
            <DialogDescription>
              Add external link to link your album.
            </DialogDescription>
          </DialogHeader>

          <Input
            className='mt-2'
            placeholder='Enter album link...'
            value={albumLink}
            onChange={(e) => setAlbumLink(e.target.value)}
          />

          <DialogFooter className='mt-4 flex justify-end'>
            <Button onClick={handleAddPreview}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File History Section */}
      <div className='mt-8 text-xl font-bold'>File History</div>
      <div className='mt-4 max-h-[200px] space-y-4 overflow-y-auto rounded-sm border-l-4 bg-gray-50 pl-3'>
        {versions.map((version, index) => (
          <div
            key={index}
            className='mt-2 flex items-center space-x-3 text-sm text-gray-700'
          >
            <Icon icon='bi:file-earmark' className='text-gray-500' />
            <Link
              href={version}
              className='text-black hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              Version {index + 1}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
