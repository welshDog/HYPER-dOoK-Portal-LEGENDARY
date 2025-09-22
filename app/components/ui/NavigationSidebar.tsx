// ========================================
// Navigation Sidebar - ADHD-Optimized Menu
// ========================================

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Trophy,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  Brain,
  Heart
} from 'lucide-react'
import { useUIStore } from '../../store'
import { cn } from '../../lib/utils'

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Crystal Empire',
    icon: LayoutDashboard,
    color: 'text-broski-purple',
    description: 'Your memory crystal collection'
  },
  {
    id: 'create',
    label: 'Create Crystal',
    icon: Sparkles,
    color: 'text-adhd-success',
    description: 'Add new memory crystals'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    color: 'text-broski-blue',
    description: 'Track your progress'
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: Trophy,
    color: 'text-adhd-warning',
    description: 'Celebrate your wins'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    color: 'text-text-muted-light',
    description: 'Customize your experience'
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: HelpCircle,
    color: 'text-broski-pink',
    description: 'Get assistance'
  }
]

export function NavigationSidebar() {
  const { sidebarOpen, toggleSidebar, currentView, setCurrentView } = useUIStore()

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -280,
          width: sidebarOpen ? 320 : 80
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 z-50 h-full',
          'bg-gradient-to-b from-white/95 via-white/90 to-neuro-bg-cream/95',
          'dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95',
          'backdrop-blur-lg border-r border-white/20',
          'shadow-2xl'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-broski-purple to-broski-pink text-white flex items-center justify-center font-bold">
                      ⚡
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">
                        HYPER dOoK
                      </h2>
                      <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                        Portal 2025
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'w-full flex items-center gap-4 p-3 rounded-xl',
                    'text-left transition-all duration-200',
                    'group relative overflow-hidden',
                    isActive
                      ? 'bg-gradient-to-r from-broski-purple/20 to-broski-pink/20 text-broski-purple shadow-lg'
                      : 'hover:bg-white/50 dark:hover:bg-gray-800/50 text-text-primary-light dark:text-text-primary-dark'
                  )}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-broski-purple to-broski-pink rounded-r-full"
                    />
                  )}

                  <Icon className={cn(
                    'w-6 h-6 flex-shrink-0',
                    isActive ? 'text-broski-purple' : item.color
                  )} />

                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 min-w-0"
                      >
                        <div className="font-medium text-sm">
                          {item.label}
                        </div>
                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark opacity-70">
                          {item.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-broski-blue/20 to-adhd-focus/20">
                      <Zap className="w-4 h-4 mx-auto text-adhd-focus mb-1" />
                      <div className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">28</div>
                      <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">Crystals</div>
                    </div>
                    <div className="p-2 rounded-lg bg-gradient-to-r from-adhd-success/20 to-broski-green/20">
                      <Brain className="w-4 h-4 mx-auto text-adhd-success mb-1" />
                      <div className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">7</div>
                      <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">Streak</div>
                    </div>
                    <div className="p-2 rounded-lg bg-gradient-to-r from-broski-pink/20 to-adhd-energy/20">
                      <Heart className="w-4 h-4 mx-auto text-broski-pink mb-1" />
                      <div className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">156</div>
                      <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">Celebrations</div>
                    </div>
                  </div>

                  {/* Version Info */}
                  <div className="text-center">
                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
                      Portal v2025.1 • LEGENDARY
                    </div>
                    <div className="text-[10px] text-adhd-success">
                      🎊 All systems operational!
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  )
}