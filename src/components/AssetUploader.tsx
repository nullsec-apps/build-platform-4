import { useRef } from 'react'
import { useAssetUpload } from '../hooks/useAssetUpload'
import { Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AssetUploader({ onUploaded }: { onUploaded?: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const { upload, uploading, progress } = useAssetUpload()
  const handle = async (f?: File) => {
    if (!f) return
    try { const url = await upload(f); if (url) { onUploaded?.(url); toast.success('Asset uploaded') } else toast.error('Upload failed') }
    catch { toast.error('Upload failed') }
  }
  return (
    <div className='p-4'>
      <div onClick={() => ref.current?.click()} className='rounded-lg border border-dashed border-[#2a2e38] hover:border-[#FF5C2B]/50 p-6 text-center cursor-pointer transition-colors duration-200'>
        {uploading ? <Loader2 className='mx-auto animate-spin text-[#FF5C2B]' size={22} /> : <Upload className='mx-auto text-[#7E8794]' size={22} />}
        <p className='mt-2 text-sm text-[#F2F4F7]'>{uploading ? `Uploading ${progress}%` : 'Drop logo or reference screenshot'}</p>
        <p className='text-[10px] font-mono text-[#7E8794] mt-1'>FEEDS GENERATION</p>
      </div>
      <input ref={ref} type='file' accept='image/*' className='hidden' onChange={e => handle(e.target.files?.[0])} />
    </div>
  )
}