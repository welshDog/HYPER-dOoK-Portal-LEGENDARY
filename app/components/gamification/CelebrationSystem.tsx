// ========================================
// Celebration System - Dopamine-Driven Rewards
// ========================================

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore, useUserStore } from '../../store'
import confetti from 'canvas-confetti'

interface Celebration {
  id: string
  type: 'success' | 'achievement' | 'milestone' | 'streak'
  message: string
  intensity: 'gentle' | 'moderate' | 'explosive'
  duration: number
}

export function CelebrationSystem() {
  const [activeCelebration, setActiveCelebration] = useState<Celebration | null>(null)
  const { preferences } = useUserStore()

  // Trigger confetti based on intensity
  const triggerConfetti = (intensity: Celebration['intensity']) => {
    const overlay = document.getElementById('celebration-overlay')
    if (!overlay || preferences.reducedMotion) return

    const configs = {
      gentle: {
        particleCount: 50,
        spread: 45,
        startVelocity: 25,
        colors: ['#8B5CF6', '#EC4899', '#00D4FF']
      },
      moderate: {
        particleCount: 100,
        spread: 70,
        startVelocity: 35,
        colors: ['#8B5CF6', '#EC4899', '#00D4FF', '#22C55E', '#F59E0B']
      },
      explosive: {
        particleCount: 200,
        spread: 100,
        startVelocity: 45,
        colors: ['#8B5CF6', '#EC4899', '#00D4FF', '#22C55E', '#F59E0B', '#FF4757']
      }
    }

    const config = configs[intensity]

    // Fire confetti from multiple positions
    const positions = intensity === 'explosive' ? [0.25, 0.5, 0.75] : [0.5]

    positions.forEach((origin, index) => {
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: origin, y: 0.6 },
          gravity: 0.8,
          ticks: 200,
          decay: 0.9
        })
      }, index * 200)
    })
  }

  // Play celebration sound
  const playSound = (type: Celebration['type']) => {
    if (!preferences.soundEnabled) return

    // In a real app, you'd load actual sound files
    const audio = new Audio()

    const sounds = {
      success: '/sounds/success-chime.mp3',
      achievement: '/sounds/achievement-fanfare.mp3', 
      milestone: '/sounds/milestone-bell.mp3',
      streak: '/sounds/streak-power.mp3'
    }

    audio.src = sounds[type] || sounds.success
    audio.volume = 0.3
    audio.play().catch(() => {
      // Ignore if audio fails to play
    })
  }

  // Mock celebration trigger (in real app, this would come from store actions)
  useEffect(() => {
    // Example celebration triggers
    const celebrations: Celebration[] = [
      {
        id: '1',
        type: 'success',
        message: '🎊 Crystal Created! +200 BROski$ earned!',
        intensity: 'moderate',
        duration: 3000
      },
      {
        id: '2', 
        type: 'achievement',
        message: '🏆 LEGENDARY! Achievement Unlocked: Crystal Master!',
        intensity: 'explosive',
        duration: 5000
      },
      {
        id: '3',
        type: 'streak',
        message: '🔥 7-Day Streak! You are ON FIRE, BROski!',
        intensity: 'moderate',
        duration: 4000
      }
    ]

    // Demo: trigger random celebration after 3 seconds
    const timeout = setTimeout(() => {
      if (preferences.celebrationLevel !== 'subtle') {
        const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)]
        celebrate(randomCelebration)
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [preferences.celebrationLevel])

  const celebrate = (celebration: Celebration) => {
    // Adjust intensity based on user preference
    let adjustedIntensity = celebration.intensity
    if (preferences.celebrationLevel === 'subtle') {
      adjustedIntensity = 'gentle'
    } else if (preferences.celebrationLevel === 'moderate') {
      adjustedIntensity = celebration.intensity === 'explosive' ? 'moderate' : celebration.intensity
    }

    const adjustedCelebration = {
      ...celebration,
      intensity: adjustedIntensity
    }

    setActiveCelebration(adjustedCelebration)

    // Trigger effects
    triggerConfetti(adjustedIntensity)
    playSound(celebration.type)

    // Auto-clear after duration
    setTimeout(() => {
      setActiveCelebration(null)
    }, adjustedCelebration.duration)
  }

  return (
    <>
      {/* Celebration Message Overlay */}
      <AnimatePresence>
        {activeCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-adhd-success via-broski-green to-adhd-success text-white px-8 py-4 rounded-2xl shadow-2xl border border-white/20">
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold mb-2"
                >
                  {activeCelebration.message}
                </motion.div>

                {/* Sparkle Animation */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="text-4xl"
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating BROski$ Animation */}
      <AnimatePresence>
        {activeCelebration?.type === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: -100, scale: [0.5, 1, 1.2] }}
            transition={{ duration: 2 }}
            className="fixed top-1/3 right-8 z-50 pointer-events-none"
          >
            <div className="bg-broski-purple text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
              +200 BROski$
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Badge Animation */}
      <AnimatePresence>
        {activeCelebration?.type === 'achievement' && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: 1, 
              scale: [0, 1.3, 1], 
              rotate: [180, 0, -5, 5, 0] 
            }}
            transition={{ duration: 1.5 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-adhd-warning to-broski-orange rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <span className="text-3xl">🏆</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak Fire Animation */}
      <AnimatePresence>
        {activeCelebration?.type === 'streak' && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1, 1.1, 1],
              rotate: [0, -2, 2, -2, 2, 0]
            }}
            transition={{ 
              duration: 0.5, 
              repeat: activeCelebration.duration / 500 
            }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="text-6xl">🔥</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}