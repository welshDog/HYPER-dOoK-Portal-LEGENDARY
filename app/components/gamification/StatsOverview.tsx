// ========================================
// Stats Overview - ADHD-Friendly Progress Dashboard
// ========================================

'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  Heart, 
  Star, 
  TrendingUp, 
  Calendar,
  Target,
  Trophy
} from 'lucide-react'
import { useUserStore, useCrystalStore } from '../../store'
import { cn } from '../../lib/utils'

export function StatsOverview() {
  const { stats, broskiBalance } = useUserStore()
  const { crystals } = useCrystalStore()

  const statCards = [
    {
      id: 'broski-balance',
      title: 'BROski$ Balance',
      value: broskiBalance.toLocaleString(),
      icon: Zap,
      color: 'from-broski-purple to-broski-pink',
      textColor: 'text-white',
      change: '+1,200 today',
      changeType: 'positive' as const
    },
    {
      id: 'crystals-total',
      title: 'Memory Crystals',
      value: crystals.length.toString(),
      icon: Brain,
      color: 'from-adhd-focus to-broski-blue',
      textColor: 'text-white',
      change: '+3 this week',
      changeType: 'positive' as const
    },
    {
      id: 'celebrations',
      title: 'Celebrations',
      value: stats.celebrationsTriggered.toString(),
      icon: Heart,
      color: 'from-broski-pink to-adhd-energy',
      textColor: 'text-white',
      change: '+12 today',
      changeType: 'positive' as const
    },
    {
      id: 'hyperfocus-streak',
      title: 'Focus Streak',
      value: `${stats.currentStreak} days`,
      icon: Target,
      color: 'from-adhd-success to-broski-green',
      textColor: 'text-white',
      change: 'Personal best!',
      changeType: 'positive' as const
    }
  ]

  const weeklyProgress = [
    { day: 'Mon', crystals: 4, celebrations: 8 },
    { day: 'Tue', crystals: 6, celebrations: 12 },
    { day: 'Wed', crystals: 3, celebrations: 6 },
    { day: 'Thu', crystals: 8, celebrations: 16 },
    { day: 'Fri', crystals: 5, celebrations: 10 },
    { day: 'Sat', crystals: 7, celebrations: 14 },
    { day: 'Sun', crystals: 9, celebrations: 18 }
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={cn(
                'p-6 rounded-2xl bg-gradient-to-br shadow-lg relative overflow-hidden',
                stat.color
              )}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/patterns/celebration-pattern.svg')] bg-repeat bg-[length:40px_40px]" />
              </div>

              <div className="relative">
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Icon className={cn('w-8 h-8', stat.textColor)} />
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Value */}
                <div className={cn('text-3xl font-bold mb-2', stat.textColor)}>
                  {stat.value}
                </div>

                {/* Title */}
                <div className={cn('text-sm opacity-90 mb-2', stat.textColor)}>
                  {stat.title}
                </div>

                {/* Change Indicator */}
                <div className={cn('text-xs flex items-center gap-1', stat.textColor, 'opacity-80')}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
              Weekly Progress
            </h3>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Your productivity rhythm this week
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-broski-blue" />
              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Crystals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-broski-pink" />
              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Celebrations</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex items-end justify-between h-32 gap-2">
          {weeklyProgress.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="flex items-end gap-1 w-full">
                {/* Crystals Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.crystals / 10) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-broski-blue to-adhd-focus rounded-t-md min-h-[4px]"
                />

                {/* Celebrations Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.celebrations / 20) * 100}%` }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-broski-pink to-adhd-energy rounded-t-md min-h-[4px]"
                />
              </div>

              <div className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium">
                {day.day}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Recent Achievement */}
        <div className="bg-gradient-to-r from-adhd-success/20 to-broski-green/20 rounded-xl p-4 border border-adhd-success/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-adhd-success" />
            <div>
              <div className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                Crystal Master
              </div>
              <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                Created 25+ crystals
              </div>
            </div>
          </div>
        </div>

        {/* Current Goal */}
        <div className="bg-gradient-to-r from-broski-blue/20 to-adhd-focus/20 rounded-xl p-4 border border-broski-blue/30">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-broski-blue" />
            <div>
              <div className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                Weekly Goal
              </div>
              <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                32/35 crystals (91%)
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-gradient-to-r from-broski-blue to-adhd-focus h-2 rounded-full" style={{ width: '91%' }} />
            </div>
          </div>
        </div>

        {/* Streak Status */}
        <div className="bg-gradient-to-r from-broski-purple/20 to-broski-pink/20 rounded-xl p-4 border border-broski-purple/30">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-broski-purple" />
            <div>
              <div className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                LEGENDARY Streak
              </div>
              <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                {stats.currentStreak} days strong!
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}