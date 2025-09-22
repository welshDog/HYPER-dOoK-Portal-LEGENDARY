// ========================================
// Hyperfocus Panel - ADHD Focus Enhancement
// ========================================

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Timer, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react'
import { useUIStore, useUserStore } from '../../store'
import { cn } from '../../lib/utils'

export function HyperfocusPanel() {
  const [sessionTime, setSessionTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [distractionsHidden, setDistractionsHidden] = useState(false)

  const { toggleHyperfocus } = useUIStore()
  const { preferences, updateStats } = useUserStore()

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(time => time + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive])

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartPause = () => {
    setIsActive(!isActive)

    if (!isActive) {
      // Starting session
      updateStats({ hyperfocusSessions: (useUserStore.getState().stats.hyperfocusSessions || 0) + 1 })
    }
  }

  const handleReset = () => {
    setIsActive(false)
    setSessionTime(0)
  }

  const handleExit = () => {
    toggleHyperfocus()
    if (sessionTime > 60) {
      // Award points for session longer than 1 minute
      useUserStore.getState().addBroskiPoints(
        Math.floor(sessionTime / 60) * 10,
        'hyperfocus-session'
      )
    }
  }

  const toggleDistractions = () => {
    setDistractionsHidden(!distractionsHidden)

    // Apply/remove distraction hiding
    const distractionElements = document.querySelectorAll('.distraction')
    distractionElements.forEach(el => {
      if (distractionsHidden) {
        el.classList.remove('opacity-0', 'pointer-events-none')
      } else {
        el.classList.add('opacity-0', 'pointer-events-none')
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-adhd-focus/10 to-broski-blue/10 rounded-2xl p-6 border border-adhd-focus/20"
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-adhd-focus/20">
            <Brain className="w-6 h-6 text-adhd-focus" />
          </div>

          <div>
            <h3 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">
              Hyperfocus Mode Active
            </h3>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Distraction-free productivity zone
            </p>
          </div>
        </div>

        {/* Center Section - Timer */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-adhd-focus font-mono">
              {formatTime(sessionTime)}
            </div>
            <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
              Focus Session
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartPause}
              className="p-3 rounded-xl bg-adhd-focus text-white hover:bg-adhd-focus/80 transition-colors"
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={cn(
              'p-3 rounded-xl transition-colors',
              soundEnabled 
                ? 'bg-broski-green/20 text-broski-green' 
                : 'bg-gray-100 text-gray-400'
            )}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Hide Distractions */}
          <button
            onClick={toggleDistractions}
            className={cn(
              'p-3 rounded-xl transition-colors',
              distractionsHidden
                ? 'bg-broski-purple/20 text-broski-purple'
                : 'bg-gray-100 text-gray-600'
            )}
          >
            {distractionsHidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>

          {/* Exit Hyperfocus */}
          <button
            onClick={handleExit}
            className="px-4 py-3 bg-white/50 hover:bg-white/70 rounded-xl font-medium transition-colors"
          >
            Exit Focus
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
          <span>Session Progress</span>
          <span>{Math.floor(sessionTime / 60)} minutes</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-adhd-focus to-broski-blue h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min((sessionTime / (25 * 60)) * 100, 100)}%` // 25-minute target
            }}
          />
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
          <div className="w-2 h-2 bg-adhd-success rounded-full" />
          <span>Alt+H to toggle focus mode</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
          <div className="w-2 h-2 bg-broski-blue rounded-full" />
          <span>Earn 10 BROski$ per minute</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
          <div className="w-2 h-2 bg-broski-purple rounded-full" />
          <span>Sessions tracked in analytics</span>
        </div>
      </div>
    </motion.div>
  )
}