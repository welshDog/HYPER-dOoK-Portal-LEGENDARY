// ========================================
// Welcome Modal - First-Time User Experience
// ========================================

'use client'

import { motion } from 'framer-motion'
import { 
  X, 
  Sparkles, 
  Brain, 
  Heart, 
  Zap, 
  ChevronRight,
  Star
} from 'lucide-react'
import { useState } from 'react'

interface WelcomeModalProps {
  onClose: () => void
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: '🚀 Welcome to Your HYPER dOoK Portal!',
      description: 'Your legendary ADHD-optimized Memory Crystal Empire awaits! This portal is designed specifically for neurodivergent minds with celebration-driven productivity.',
      icon: Sparkles,
      color: 'from-broski-purple to-broski-pink'
    },
    {
      title: '💎 Memory Crystals System',
      description: 'Transform your thoughts, ideas, and tasks into beautiful Memory Crystals. Each crystal earns BROski$ points and can trigger dopamine-boosting celebrations!',
      icon: Brain,
      color: 'from-adhd-focus to-broski-blue'
    },
    {
      title: '🎊 Celebration-Driven Design',
      description: 'Every action triggers positive reinforcement! From gentle sparkles to explosive celebrations, your achievements are always recognized and celebrated.',
      icon: Heart,
      color: 'from-broski-pink to-adhd-energy'
    },
    {
      title: '⚡ ADHD-Optimized Features',
      description: 'Hyperfocus mode, dyslexia-friendly fonts, reduced motion options, and distraction-free interfaces - all designed to support your neurodivergent brain.',
      icon: Zap,
      color: 'from-adhd-success to-broski-green'
    }
  ]

  const currentStep = steps[step]
  const isLastStep = step === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onClose()
    } else {
      setStep(step + 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${currentStep.color} p-6 text-white relative overflow-hidden`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            data-close
          >
            <X className="w-5 h-5" />
          </button>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/patterns/celebration-pattern.svg')] bg-repeat bg-[length:60px_60px]" />
          </div>

          {/* Content */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <currentStep.icon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm opacity-80 mb-1">
                  Step {step + 1} of {steps.length}
                </div>
                <h2 className="text-2xl font-bold">
                  {currentStep.title}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-text-muted-light dark:text-text-muted-dark text-lg leading-relaxed mb-6">
            {currentStep.description}
          </p>

          {/* Progress indicator */}
          <div className="flex gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= step ? 'bg-broski-purple' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Features preview for step 0 */}
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-broski-purple/10 rounded-lg">
                <Brain className="w-5 h-5 text-broski-purple" />
                <span className="text-sm font-medium">ADHD-First</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-adhd-success/10 rounded-lg">
                <Heart className="w-5 h-5 text-adhd-success" />
                <span className="text-sm font-medium">Dyslexia-Friendly</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-broski-blue/10 rounded-lg">
                <Star className="w-5 h-5 text-broski-blue" />
                <span className="text-sm font-medium">Gamified</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-broski-pink/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-broski-pink" />
                <span className="text-sm font-medium">Celebration-Driven</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
              {isLastStep ? 'Ready to start your crystal empire?' : 'Learn more about your portal'}
            </div>

            <div className="flex items-center gap-3">
              {!isLastStep && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-text-muted-light hover:text-text-primary-light transition-colors"
                >
                  Skip Tour
                </button>
              )}

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentStep.color} text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                {isLastStep ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Let's Go!
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}