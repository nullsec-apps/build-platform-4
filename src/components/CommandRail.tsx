import { useNavigate } from 'react-router-dom'
import { HardHat, LayoutGrid, Hammer, History, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function CommandRail({ active, onNav }: { active: string; onNav: (v: string) => void }) {
  const nav = useNavigate()
  const { signOut } = useAuth()
  const items = [
    { id: 'build', icon: <Hammer size={20} />, label: 'Build' },
    { id: 'history', icon: <History size={20} />, label: 'History' },
  ]
  return (
    <div className='hidden md:flex w-[72px] flex-col items-center border-r border-[#2a2e38] bg-[#0F1115] py-4 gap-1 shrink-0'>
      <button onClick={() => nav('/projects')} className='h-10 w-10 rounded-md bg-[#FF5C2B] flex items-center justify-center text-[#0F1115] mb-4 transition-transform duration-200 hover:scale-105'><HardHat size={20} /></button>
      <button onClick={() => nav('/projects')} className='group flex flex-col items-center gap-1 py-2.5 text-[#7E8794] hover:text-[#F2F4F7] w-full transition-colors'><LayoutGrid size={20} /><span className='text-[9px] font-mono uppercase'>Sites</span></button>
      <div className='w-8 h-px bg-[#2a2e38] my-1' />
      {items.map(it => (
        <button key={it.id} onClick={() => onNav(it.id)} className={`group flex flex-col items-center gap-1 py-2.5 w-full transition-colors duration-200 ${active === it.id ? 'text-[#FF5C2B]' : 'text-[#7E8794] hover:text-[#F2F4F7]'}`}>
          {it.icon}<span className='text-[9px] font-mono uppercase'>{it.label}</span>
        </button>
      ))}
      <button onClick={() => signOut()} className='mt-auto flex flex-col items-center gap-1 py-2.5 text-[#7E8794] hover:text-[#FF5C2B] transition-colors'><LogOut size={20} /><span className='text-[9px] font-mono uppercase'>Exit</span></button>
    </div>
  )
}