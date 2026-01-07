import { registerSW } from 'virtual:pwa-register'

// Register service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to user that new content is available
    if (confirm('Új verzió érhető el. Frissítsük az oldalt?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('Az alkalmazás offline módban is használható.')
  },
  onRegistered(registration) {
    console.log('Service Worker regisztrálva:', registration)
    
    // Check for updates periodically (every hour)
    if (registration) {
      setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000)
    }
  },
  onRegisterError(error) {
    console.error('Service Worker regisztrációs hiba:', error)
  }
})

export { updateSW }
