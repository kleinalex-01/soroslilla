import { useState, useEffect, useMemo } from 'react'
import { usePWA } from '../hooks/usePWA'
import './PWAPrompt.css'

function wasPromptRecentlyDismissed(): boolean {
  const dismissed = localStorage.getItem('pwa-prompt-dismissed')
  if (dismissed) {
    const dismissedTime = parseInt(dismissed, 10)
    const sevenDays = 7 * 24 * 60 * 60 * 1000
    return Date.now() - dismissedTime < sevenDays
  }
  return false
}

export function PWAPrompt() {
  const { isInstallable, isOnline, installApp } = usePWA()
  const initialShowPrompt = useMemo(() => !wasPromptRecentlyDismissed(), [])
  const [showPrompt, setShowPrompt] = useState(false)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    // Show install prompt after a delay if installable
    if (isInstallable && initialShowPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInstallable, initialShowPrompt])

  useEffect(() => {
    // Track when going offline
    if (!isOnline) {
      setWasOffline(true)
      setShowOfflineMessage(true)
      const timer = setTimeout(() => {
        setShowOfflineMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    } else if (wasOffline) {
      // Show online message briefly when coming back online
      setShowOfflineMessage(false)
    }
  }, [isOnline, wasOffline])

  const handleInstall = async () => {
    const installed = await installApp()
    if (installed) {
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Don't show again for 7 days
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  return (
    <>
      {/* Install Prompt */}
      {showPrompt && isInstallable && (
        <div className="pwa-prompt">
          <div className="pwa-prompt-content">
            <div className="pwa-prompt-icon">💄</div>
            <div className="pwa-prompt-text">
              <h3>Telepítsd az alkalmazást!</h3>
              <p>Add hozzá a kezdőképernyődhöz a gyors eléréshez.</p>
            </div>
            <div className="pwa-prompt-actions">
              <button onClick={handleInstall} className="pwa-btn-install">
                Telepítés
              </button>
              <button onClick={handleDismiss} className="pwa-btn-dismiss">
                Később
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Message */}
      {showOfflineMessage && (
        <div className="pwa-offline-message">
          <span>📡</span> Offline módban vagy. Egyes funkciók korlátozottak lehetnek.
        </div>
      )}

      {/* Online indicator after being offline */}
      {isOnline && wasOffline && !showOfflineMessage && (
        <div className="pwa-online-message">
          <span>✅</span> Újra online vagy!
        </div>
      )}
    </>
  )
}