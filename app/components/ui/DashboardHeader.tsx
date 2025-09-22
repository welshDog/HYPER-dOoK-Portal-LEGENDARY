// ========================================
// Dashboard Header - ADHD-Optimized Navigation
// ========================================

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Settings, 
  User,
  Zap,
  Brain,
  Menu,
  Sun,
  Moon
} from 'lucide-react'
import { useUIStore, useUserStore, useCrystalStore } from '../../store'
import { cn } from '../../lib/utils'

export function DashboardHeader() {
  const [searchFocused, setSearchFocused] = useState(false)

  const { 
    sidebarOpen, 
    toggleSidebar, 
    hyperfocusMode, 
    toggleHyperfocus 
  } = useUIStore()

  const { preferences, stats } = useUserStore()
  const { searchQuery, setSearchQuery } = useCrystalStore()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo & Title */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-broski-purple to-broski-pink text-white font-bold text-lg">
                ⚡
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  HYPER dOoK Portal
                </h1>
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                  BROski$ Balance: {stats.totalBroskiPoints.toLocaleString()}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className={cn(
              'relative transition-all duration-200',
              searchFocused && 'scale-105'
            )}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted-light dark:text-text-muted-dark" />
              <input
                type="text"
                placeholder="Search your crystal empire..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  'w-full pl-10 pr-4 py-3 rounded-xl',
                  'bg-white/50 dark:bg-gray-800/50',
                  'border border-white/20 dark:border-gray-700/50',
                  'focus:border-adhd-focus focus:ring-2 focus:ring-adhd-focus/20',
                  'text-text-primary-light dark:text-text-primary-dark',
                  'placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark',
                  'transition-all duration-200',
                  'font-primary text-base',
                  preferences.dyslexicMode && 'dyslexic-text'
                )}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Hyperfocus Toggle */}
            <motion.button
              onClick={toggleHyperfocus}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'p-3 rounded-xl transition-all duration-200',
                'flex items-center gap-2 font-medium text-sm',
                hyperfocusMode
                  ? 'bg-adhd-focus text-white shadow-lg hyperfocus-glow'
                  : 'bg-white/50 text-text-primary-light hover:bg-white/70'
              )}
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">
                {hyperfocusMode ? 'Exit Focus' : 'Hyperfocus'}
              </span>
            </motion.button>

            {/* Notifications */}
            <button className="relative p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-adhd-success rounded-full flex items-center justify-center text-xs font-bold text-white">
                3
              </div>
            </button>

            {/* Settings */}
            <button className="p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/20">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  Chief Lyndz
                </div>
                <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
                  Level {Math.floor(stats.totalBroskiPoints / 1000)} BROski
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-broski-blue to-broski-green flex items-center justify-center text-white font-bold text-lg">
                🦸‍♂️
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}