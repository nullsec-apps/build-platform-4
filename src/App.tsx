import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import LandingHero from './components/LandingHero'
import ProjectsDashboard from './components/ProjectsDashboard'
import WorkbenchLayout from './components/WorkbenchLayout'
import AuthGate from './components/AuthGate'
import './index.css'

const qc = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingHero />} />
          <Route path='/projects' element={<AuthGate><ProjectsDashboard /></AuthGate>} />
          <Route path='/build/:id' element={<AuthGate><WorkbenchLayout /></AuthGate>} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Toaster theme='dark' position='bottom-right' />
      </BrowserRouter>
    </QueryClientProvider>
  )
}