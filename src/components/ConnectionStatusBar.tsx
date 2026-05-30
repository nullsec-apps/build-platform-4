import { useRealtimeChannel } from '../hooks/useRealtimeChannel'
import { Wifi, WifiOff, Loader2 } from 'lucide-react'
import { Badge } from './ui/badge'

export default function ConnectionStatusBar({ lastSaved }: { lastSaved?: string }) {
  const { status } = useRealtimeChannel()
  const map = {
    connecting: { icon: <Loader2 size={12} className='animate-spin' />, label: 'Connecting', color: 'text-[#7E8794] border-[#2a2e38]' },
    connected: { icon: <Wifi size={12} />, label: 'Live', color: 'text-[#3DDC97] border-[#3DDC97]/40' },
    offline: { icon: <WifiOff size={12} />, label: 'Offline', color: 'text-[#FF5C2B] border-[#FF5C2B]/40' },
  }[status]
  return (
    <div className='flex items-center gap-3 px-4 py-1.5 border-t border-[#2a2e38] bg-[#0F1115] text-[11px] text-[#7E8794]'>
      <Badge className={`gap-1.5 ${map.color}`}>{map.icon}{map.label}</Badge>
      {lastSaved && <span className='font-mono hidden sm:inline'>SAVED · {lastSaved}</span>}
      <span className='ml-auto font-mono opacity-50'>BLUEPRINTFORGE v1.0</span>
    </div>
  )
}