// ========================================
// HYPER dOoK Portal 2025 - Utility Functions
// ========================================

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Tailwind CSS class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ========================================
// ADHD-Optimized Utilities
// ========================================

/**
 * Generate celebration-worthy messages for dopamine hits
 */
export const celebrationMessages = {
  crystalCreated: [
    "🎊 LEGENDARY Crystal Created, BROski!",
    "⚡ Your Memory Empire Grows!",
    "💎 Another Crystal for the Collection!",
    "🚀 Hyperfocus Mode ACTIVATED!",
    "🔥 Crystal Creation Champion!"
  ],
  crystalCompleted: [
    "🏆 BOOM! Crystal COMPLETED!",
    "🌟 Achievement Unlocked: Crystal Master!",
    "🎯 Target DESTROYED! Nice Work!",
    "💪 Dopamine Level: MAXIMUM!",
    "⭐ You're ON FIRE, BROski!"
  ],
  streakMilestone: [
    "🔥 STREAK POWER: ACTIVATED!",
    "⚡ Consistency Champion!",
    "🏃‍♂️ Momentum Master!",
    "💫 Unstoppable Force!",
    "🚀 Rocket Fuel Engaged!"
  ]
}

/**
 * Get random celebration message
 */
export function getRandomCelebration(type: keyof typeof celebrationMessages): string {
  const messages = celebrationMessages[type]
  return messages[Math.floor(Math.random() * messages.length)]
}

/**
 * Calculate BROski$ points with ADHD-friendly bonuses
 */
export function calculateBroskiPoints(
  basePoints: number,
  multipliers: {
    streak?: number
    hyperfocus?: boolean
    aiEnhanced?: boolean
    celebration?: boolean
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'
  } = {}
): number {
  let total = basePoints

  // Streak bonus (exponential for dopamine)
  if (multipliers.streak && multipliers.streak > 1) {
    total *= Math.min(1 + (multipliers.streak * 0.1), 3.0) // Max 3x multiplier
  }

  // Hyperfocus bonus (major reward)
  if (multipliers.hyperfocus) {
    total *= 2.0
  }

  // AI enhancement bonus
  if (multipliers.aiEnhanced) {
    total *= 1.5
  }

  // Celebration bonus (for engaging with celebrations)
  if (multipliers.celebration) {
    total *= 1.25
  }

  // Time-of-day bonus (ADHD peak performance times)
  if (multipliers.timeOfDay) {
    const timeMultipliers = {
      morning: 1.3,    // Peak ADHD performance
      afternoon: 1.0,  // Normal
      evening: 1.1,    // Good for creative work
      night: 0.9       // Lower energy typically
    }
    total *= timeMultipliers[multipliers.timeOfDay]
  }

  return Math.round(total)
}

/**
 * ADHD-friendly time formatting
 */
export function formatADHDTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // ADHD-friendly relative time formats
  if (diffMins < 1) return "Just now! 🔥"
  if (diffMins < 5) return `${diffMins}min ago ⚡`
  if (diffMins < 60) return `${diffMins}min ago`
  if (diffHours < 2) return "About an hour ago"
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 2) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`

  // Absolute format for older items
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

/**
 * Generate ADHD-friendly unique IDs
 */
export function generateCrystalId(): string {
  const prefixes = ['HYPER', 'ULTRA', 'MEGA', 'SUPER', 'LEGENDARY']
  const suffixes = ['CRYSTAL', 'GEM', 'STONE', 'SHARD', 'ORB']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)

  return `${prefix}-${suffix}-${timestamp}-${random}`.toUpperCase()
}

// ========================================
// Dyslexia-Friendly Text Processing
// ========================================

/**
 * Break text into dyslexia-friendly chunks
 */
export function chunkTextForDyslexia(text: string, chunkSize: number = 50): string[] {
  const words = text.split(' ')
  const chunks: string[] = []
  let currentChunk = ''

  for (const word of words) {
    if ((currentChunk + ' ' + word).length <= chunkSize) {
      currentChunk = currentChunk ? currentChunk + ' ' + word : word
    } else {
      if (currentChunk) chunks.push(currentChunk)
      currentChunk = word
    }
  }

  if (currentChunk) chunks.push(currentChunk)
  return chunks
}

/**
 * Add dyslexia-friendly formatting to text
 */
export function formatForDyslexia(text: string): string {
  return text
    .replace(/\b(the|and|or|but|if|then|when|where|why|how)\b/gi, (match) => 
      `<strong class="font-semibold text-broski-purple">${match}</strong>`
    )
    .replace(/(\d+)/g, '<span class="font-mono text-adhd-focus">$1</span>')
}

// ========================================
// 3D Visualization Utilities
// ========================================

/**
 * Generate 3D positions for crystal constellation
 */
export function generateCrystalPositions(count: number): Array<{x: number, y: number, z: number}> {
  const positions = []
  const radius = Math.min(10, 2 + count * 0.5)

  for (let i = 0; i < count; i++) {
    // Golden ratio spiral for pleasing distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    const angle = 2 * Math.PI * i / goldenRatio
    const y = 1 - (i / (count - 1)) * 2 // -1 to 1
    const radiusAtY = Math.sqrt(1 - y * y)

    positions.push({
      x: Math.cos(angle) * radiusAtY * radius,
      y: y * radius,
      z: Math.sin(angle) * radiusAtY * radius
    })
  }

  return positions
}

/**
 * Calculate connections between crystals based on content similarity
 */
export function calculateCrystalConnections(
  crystals: Array<{id: string, content: string, tags: string[]}>
): Array<{from: string, to: string, strength: number}> {
  const connections = []

  for (let i = 0; i < crystals.length; i++) {
    for (let j = i + 1; j < crystals.length; j++) {
      const crystal1 = crystals[i]
      const crystal2 = crystals[j]

      // Simple similarity based on common tags and words
      const commonTags = crystal1.tags.filter(tag => crystal2.tags.includes(tag))
      const words1 = crystal1.content.toLowerCase().split(/\W+/)
      const words2 = crystal2.content.toLowerCase().split(/\W+/)
      const commonWords = words1.filter(word => 
        word.length > 3 && words2.includes(word)
      )

      const tagSimilarity = commonTags.length / Math.max(crystal1.tags.length, crystal2.tags.length)
      const contentSimilarity = commonWords.length / Math.max(words1.length, words2.length)
      const strength = (tagSimilarity * 0.7) + (contentSimilarity * 0.3)

      if (strength > 0.1) { // Minimum threshold
        connections.push({
          from: crystal1.id,
          to: crystal2.id,
          strength: Math.min(strength, 1.0)
        })
      }
    }
  }

  return connections
}

// ========================================
// Accessibility Utilities
// ========================================

/**
 * Generate accessible color combinations
 */
export function generateAccessibleColors(baseColor: string): {
  background: string
  text: string
  accent: string
  contrastRatio: number
} {
  // Simplified color generation - in real app would use more sophisticated color science
  const colors = {
    background: '#FAFBFC',
    text: '#1A202C', 
    accent: baseColor,
    contrastRatio: 4.5 // WCAG AA compliant
  }

  return colors
}

/**
 * Reduce motion for users with vestibular disorders
 */
export function getMotionPreference(): 'reduce' | 'no-preference' {
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    return mediaQuery.matches ? 'reduce' : 'no-preference'
  }
  return 'no-preference'
}

/**
 * Generate focus trap for keyboard navigation
 */
export function createFocusTrap(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  function handleTabKey(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

// ========================================
// Local Storage Utilities (ADHD-friendly)
// ========================================

/**
 * Safe localStorage with ADHD-friendly naming
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = localStorage.getItem(`hyper-dook-${key}`)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(`hyper-dook-${key}`, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(`hyper-dook-${key}`)
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    Object.keys(localStorage)
      .filter(key => key.startsWith('hyper-dook-'))
      .forEach(key => localStorage.removeItem(key))
  }
}

// ========================================
// Performance Utilities
// ========================================

/**
 * Debounce function for search and input optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for scroll and resize events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImages(selector: string = 'img[data-src]'): void {
  if (typeof window === 'undefined') return

  const images = document.querySelectorAll(selector)

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-src')
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))
}