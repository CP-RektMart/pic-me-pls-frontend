import { useEffect, useState } from 'react'

import { createPreview } from '@/actions/quotation/create-preview'
import { getPreviewById } from '@/actions/quotation/get-preview'
import { PreviewList } from '@/types/quotation'
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
  isPhotographer: boolean
}

export function PreviewView({ quotationId, isPhotographer }: PreviewViewProps) {
  const [albumLink, setAlbumLink] = useState('')
  const [versions, setVersions] = useState<PreviewList>([])
  const [showAddAlbumDialog, setShowAddAlbumDialog] = useState(false)

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const previews = (await getPreviewById(quotationId)) || []
        console.log(previews)
        setVersions(previews || [])
      } catch (error) {
        console.error('Error fetching quotation:', error)
        toast.error('Failed to load quotation previews.')
      }
    }
    fetchQuotation()
  }, [quotationId])

  const handleAddPreview = () => {
    try {
      new URL(albumLink)
      if (albumLink) {
        createPreview({ quotationId, link: albumLink })
        setVersions((prev) => [...(prev || []), { link: albumLink, id: 1 }])
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
      {isPhotographer && (
        <Dialog open={showAddAlbumDialog} onOpenChange={setShowAddAlbumDialog}>
          <DialogTrigger asChild>
            <Button
              variant='secondary'
              className='mb-6 w-full space-x-2 px-4 py-2'
            >
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
      )}
      {/* File History Section */}
      <div className='text-xl font-bold'>File History</div>
      <div className='mt-4 max-h-[200px] overflow-y-auto rounded-sm border-l-4 bg-gray-50 pl-3'>
        {versions && versions.length > 0 ? (
          versions.map((version, index) => (
            <div
              key={index}
              className='mb-2 mt-2 flex items-center space-x-3 text-sm text-gray-700'
            >
              <Icon icon='bi:file-earmark' className='text-gray-500' />
              <Link
                href={version.link || '#'}
                className='text-black hover:underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                Version {index + 1}
              </Link>
            </div>
          ))
        ) : (
          <p className='mb-2 mt-2 text-sm text-gray-500'>
            No previews available.
          </p>
        )}
      </div>
    </div>
  )
}
