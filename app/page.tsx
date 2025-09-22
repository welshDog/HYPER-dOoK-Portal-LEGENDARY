// ========================================
// HYPER dOoK Portal 2025 - Main Page
// ========================================

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Brain, Heart, Star } from 'lucide-react'

// Components
import { DashboardHeader } from './components/ui/DashboardHeader'
import { NavigationSidebar } from './components/ui/NavigationSidebar'
import { CrystalGrid } from './components/crystal/CrystalGrid'
import { StatsOverview } from './components/gamification/StatsOverview'
import { HyperfocusPanel } from './components/accessibility/HyperfocusPanel'
import { CelebrationSystem } from './components/gamification/CelebrationSystem'
import { Crystal3DView } from './components/3d/Crystal3DView'
import { AIAssistant } from './components/ui/AIAssistant'
import { WelcomeModal } from './components/ui/WelcomeModal'

// Hooks and stores
import { useUIStore, useUserStore, useCrystalStore } from './store'
import { cn } from './lib/utils'

// ========================================
// Main Portal Dashboard
// ========================================

export default function HyperDookPortal() {
  const [mounted, setMounted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  // Store selectors
  const { 
    sidebarOpen, 
    hyperfocusMode, 
    currentView, 
    is3DMode,
    showToast 
  } = useUIStore()

  const { preferences, stats } = useUserStore()
  const { crystals } = useCrystalStore()

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)

    // Show welcome modal for new users
    if (crystals.length <= 1) {
      setShowWelcome(true)
    }

    // Welcome message with celebration
    setTimeout(() => {
      showToast(
        '🎊 Welcome to your LEGENDARY HYPER dOoK Portal, BROski!',
        'success',
        8000
      )
    }, 1000)
  }, [crystals.length, showToast])

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-neuro-bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚡</div>
          <div className="text-2xl font-bold text-broski-purple">
            Loading Your HYPER Portal...
          </div>
          <div className="text-text-muted-light">
            Powering up the celebration engine! 🚀
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-neuro-bg-light via-neuro-bg-cream to-neuro-bg-mint',
      'dark:from-neuro-bg-dark dark:via-gray-900 dark:to-gray-800',
      'transition-all duration-500 ease-out',
      hyperfocusMode && 'hyperfocus-mode',
      preferences.reducedMotion && 'reduce-motion'
    )}>
      {/* Background Pattern */}
      {preferences.backgroundPattern && (
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/patterns/crystal-pattern.svg')] bg-repeat bg-[length:200px_200px]" />
        </div>
      )}

      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Main Content Area */}
      <div className={cn(
        'transition-all duration-300 ease-out',
        sidebarOpen ? 'lg:ml-80' : 'lg:ml-20',
        'min-h-screen'
      )}>
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Main Content */}
        <main 
          id="main-content"
          className="px-4 lg:px-8 pb-8 pt-4"
        >
          {/* Hyperfocus Panel */}
          <AnimatePresence>
            {hyperfocusMode && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="mb-6"
              >
                <HyperfocusPanel />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Overview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <StatsOverview />
          </motion.div>

          {/* Main View Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Render different views based on current selection */}
              {currentView === 'dashboard' && (
                <>
                  {/* Crystal Management */}
                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-broski-blue to-broski-purple text-white">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                            Memory Crystal Empire
                          </h2>
                          <p className="text-text-muted-light dark:text-text-muted-dark">
                            Your legendary collection of {crystals.length} crystals
                          </p>
                        </div>
                      </div>

                      {/* View Toggle */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => useUIStore.getState().toggle3DMode()}
                          className={cn(
                            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                            'flex items-center gap-2',
                            is3DMode 
                              ? 'bg-broski-purple text-white shadow-lg' 
                              : 'bg-white/50 text-text-primary-light hover:bg-white/70'
                          )}
                        >
                          <Brain className="w-4 h-4" />
                          {is3DMode ? '3D Mode' : '2D Mode'}
                        </button>
                      </div>
                    </div>

                    {/* Crystal View */}
                    {is3DMode ? (
                      <div className="h-[600px] rounded-2xl overflow-hidden bg-black/5">
                        <Crystal3DView />
                      </div>
                    ) : (
                      <CrystalGrid />
                    )}
                  </section>
                </>
              )}

              {/* Other views would be implemented here */}
              {currentView === 'analytics' && (
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 text-broski-purple mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                    Analytics Dashboard
                  </h2>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Coming soon! Track your productivity patterns and celebrate growth.
                  </p>
                </div>
              )}

              {currentView === 'achievements' && (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-adhd-success mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                    Achievement Gallery
                  </h2>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Your legendary accomplishments and celebration milestones!
                  </p>
                </div>
              )}

              {currentView === 'settings' && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-broski-pink mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                    ADHD-Friendly Settings
                  </h2>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Customize your neurodivergent experience with precision!
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating AI Assistant */}
      {!hyperfocusMode && (
        <AIAssistant />
      )}

      {/* Celebration System */}
      <CelebrationSystem />

      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeModal onClose={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* Performance Monitor (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded text-xs font-mono">
          Crystals: {crystals.length} | BROski$: {stats.totalBroskiPoints.toLocaleString()}
        </div>
      )}
    </div>
  )
}

// ========================================
// Page Metadata Export (for SSG)
// ========================================

export const metadata = {
  title: '🚀⚡ HYPER dOoK Portal - Memory Crystal Empire ⚡🚀',
  description: 'Your legendary ADHD-optimized productivity portal with celebration-driven gamification and dyslexia-friendly design.',
}