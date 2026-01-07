import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { PWAPrompt } from '../components/PWAPrompt'

export function MainLayout() {
  return (
    <>
      <PWAPrompt />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
