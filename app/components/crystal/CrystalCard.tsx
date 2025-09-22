// ========================================
// Crystal Card - Individual Memory Crystal Display
// ========================================

'use client'

import { motion } from 'framer-motion'
import { 
  Calendar, 
  Tag, 
  Star, 
  Zap, 
  Brain, 
  Heart,
  MoreVertical,
  Edit,
  Trash2,
  Copy
} from 'lucide-react'
import { useState } from 'react'
import { useCrystalStore, useUIStore, useUserStore } from '../../store'
import { formatADHDTime, cn } from '../../lib/utils'
import type { MemoryCrystal } from '../../types'

interface CrystalCardProps {
  crystal: MemoryCrystal
  viewMode?: 'grid' | 'list'
}

export function CrystalCard({ crystal, viewMode = 'grid' }: CrystalCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  const { selectCrystal, deleteCrystal, updateCrystal } = useCrystalStore()
  const { showToast } = useUIStore()
  const { preferences } = useUserStore()

  const handleSelect = () => {
    selectCrystal(crystal)
    showToast(`✨ Selected crystal: ${crystal.title}`, 'info')
  }

  const handleComplete = () => {
    updateCrystal(crystal.id, {
      status: {
        type: 'completed',
        label: 'Completed',
        icon: '✅'
      },
      broskiPoints: crystal.broskiPoints + 50
    })
    showToast(`🎉 Crystal completed! +50 BROski$ earned!`, 'success')
  }

  const handleDelete = () => {
    deleteCrystal(crystal.id)
    showToast('Crystal deleted successfully', 'info')
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
    legendary: 'bg-gradient-to-r from-broski-purple to-broski-pink text-white'
  }

  const statusColors = {
    new: 'bg-adhd-focus/20 text-adhd-focus',
    'in-progress': 'bg-broski-blue/20 text-broski-blue',
    completed: 'bg-adhd-success/20 text-adhd-success',
    celebrated: 'bg-broski-pink/20 text-broski-pink',
    archived: 'bg-gray-100 text-gray-600'
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="crystal-surface p-4 rounded-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-broski-purple/20 to-broski-pink/20 flex items-center justify-center">
            <span className="text-2xl">{crystal.category.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
              {crystal.title}
            </h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
              {crystal.content}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className={cn(
              'px-3 py-1 rounded-full text-xs font-medium',
              statusColors[crystal.status.type]
            )}>
              {crystal.status.icon} {crystal.status.label}
            </div>
            <div className="text-sm font-medium text-broski-purple">
              {crystal.broskiPoints} BROski$
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleSelect}
      className="crystal-surface p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-broski-purple/20 via-transparent to-broski-pink/20" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-broski-purple/20 to-broski-pink/20 flex items-center justify-center">
            <span className="text-xl">{crystal.category.icon}</span>
          </div>
          <div>
            <div className={cn(
              'px-2 py-1 rounded-md text-xs font-medium mb-1',
              priorityColors[crystal.priority.level]
            )}>
              {crystal.priority.level.toUpperCase()}
            </div>
            <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
              {formatADHDTime(crystal.createdAt)}
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-white/20 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleComplete()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-xl"
              >
                <Star className="w-4 h-4 inline mr-2" />
                Mark Complete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // Edit functionality
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Edit Crystal
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 rounded-b-xl"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={cn(
          'font-semibold text-lg mb-2 text-text-primary-light dark:text-text-primary-dark line-clamp-2',
          preferences.dyslexicMode && 'dyslexic-text'
        )}>
          {crystal.title}
        </h3>
        <p className={cn(
          'text-text-muted-light dark:text-text-muted-dark line-clamp-3 leading-relaxed',
          preferences.dyslexicMode && 'dyslexic-text'
        )}>
          {crystal.content}
        </p>
      </div>

      {/* Tags */}
      {crystal.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {crystal.tags.slice(0, 3).map(tag => (
            <div
              key={tag}
              className="px-2 py-1 bg-broski-blue/10 text-broski-blue rounded-md text-xs font-medium"
            >
              #{tag}
            </div>
          ))}
          {crystal.tags.length > 3 && (
            <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
              +{crystal.tags.length - 3} more
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className={cn(
          'px-3 py-1 rounded-full text-xs font-medium',
          statusColors[crystal.status.type]
        )}>
          {crystal.status.icon} {crystal.status.label}
        </div>

        <div className="flex items-center gap-4">
          {crystal.aiEnhanced && (
            <div className="flex items-center gap-1 text-xs text-adhd-focus">
              <Brain className="w-3 h-3" />
              AI Enhanced
            </div>
          )}
          <div className="flex items-center gap-1 text-sm font-bold text-broski-purple">
            <Zap className="w-4 h-4" />
            {crystal.broskiPoints}
          </div>
        </div>
      </div>

      {/* Celebration Level Indicator */}
      {crystal.celebrationLevel > 0 && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(crystal.celebrationLevel, 3) }).map((_, i) => (
              <Heart key={i} className="w-3 h-3 text-broski-pink fill-current" />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}