// ========================================
// Accessibility Provider - ADHD/Dyslexia Support System
// ========================================

'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useUserStore } from '../../store'

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void
  updateDocumentTitle: (title: string) => void
  focusElement: (elementId: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

interface AccessibilityProviderProps {
  children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const { preferences } = useUserStore()

  // Announce messages to screen readers
  const announceToScreenReader = (message: string) => {
    const announcer = document.getElementById('screen-reader-announcements')
    if (announcer) {
      announcer.textContent = message
      // Clear after announcement
      setTimeout(() => {
        announcer.textContent = ''
      }, 1000)
    }
  }

  // Update document title for screen readers
  const updateDocumentTitle = (title: string) => {
    document.title = `${title} - HYPER dOoK Portal`
  }

  // Focus specific element
  const focusElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Apply accessibility preferences
  useEffect(() => {
    const root = document.documentElement

    // Font family
    if (preferences.dyslexicMode) {
      root.classList.add('dyslexic-font')
    } else {
      root.classList.remove('dyslexic-font')
    }

    // High contrast
    if (preferences.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Reduced motion
    if (preferences.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Font size
    root.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xl: '20px'
    }[preferences.fontSize] || '16px'

  }, [preferences])

  // Keyboard navigation handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key - close modals
      if (event.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])')
        if (activeModal) {
          const closeButton = activeModal.querySelector('[data-close]')
          if (closeButton instanceof HTMLElement) {
            closeButton.click()
          }
        }
      }

      // Alt + H - Go to hyperfocus mode
      if (event.altKey && event.key === 'h') {
        event.preventDefault()
        // Toggle hyperfocus mode
        useUserStore.getState().updatePreferences({ 
          hyperfocusMode: !preferences.hyperfocusMode 
        })
        announceToScreenReader(
          preferences.hyperfocusMode ? 'Hyperfocus mode disabled' : 'Hyperfocus mode enabled'
        )
      }

      // Alt + S - Focus search
      if (event.altKey && event.key === 's') {
        event.preventDefault()
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"]')
        if (searchInput instanceof HTMLElement) {
          searchInput.focus()
          announceToScreenReader('Search focused')
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [preferences.hyperfocusMode])

  const contextValue: AccessibilityContextType = {
    announceToScreenReader,
    updateDocumentTitle,
    focusElement
  }

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}