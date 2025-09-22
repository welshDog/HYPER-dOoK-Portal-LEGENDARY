// ========================================
// Crystal Grid - ADHD-Optimized Memory Crystal Display
// ========================================

'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Filter, Search, Sparkles, Zap, Brain, Heart } from 'lucide-react'
import { useCrystalStore, useUIStore } from '../../store'
import { CrystalCard } from './CrystalCard'
import { CreateCrystalModal } from './CreateCrystalModal'
import { cn } from '../../lib/utils'

export function CrystalGrid() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { crystals, getFilteredCrystals, searchQuery } = useCrystalStore()
  const { showToast } = useUIStore()

  const filteredCrystals = useMemo(() => getFilteredCrystals(), [getFilteredCrystals])

  const handleCreateCrystal = () => {
    setShowCreateModal(true)
    showToast('✨ Ready to create a new Memory Crystal!', 'info')
  }

  const categories = [
    { id: 'all', name: 'All Crystals', icon: Sparkles, color: 'broski-purple' },
    { id: 'work', name: 'Work Magic', icon: Zap, color: 'broski-blue' },
    { id: 'personal', name: 'Life Gems', icon: Heart, color: 'broski-pink' },
    { id: 'learning', name: 'Brain Food', icon: Brain, color: 'adhd-success' }
  ]

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
            {searchQuery ? `Search: "${searchQuery}"` : 'Your Crystal Collection'}
          </h3>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            {filteredCrystals.length} of {crystals.length} crystals
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex rounded-lg bg-white/50 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                viewMode === 'grid' 
                  ? 'bg-broski-purple text-white' 
                  : 'text-text-muted-light hover:text-text-primary-light'
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                viewMode === 'list' 
                  ? 'bg-broski-purple text-white' 
                  : 'text-text-muted-light hover:text-text-primary-light'
              )}
            >
              List
            </button>
          </div>

          {/* Create Crystal Button */}
          <motion.button
            onClick={handleCreateCrystal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-adhd-success to-broski-green text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create Crystal
          </motion.button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full',
                'bg-white/50 hover:bg-white/70 transition-all duration-200',
                'border border-white/20'
              )}
            >
              <Icon className={`w-4 h-4 text-${category.color}`} />
              <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                {category.name}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredCrystals.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-broski-purple/20 to-broski-pink/20 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-broski-purple" />
          </div>
          <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            {searchQuery ? 'No crystals found' : 'Your crystal empire awaits!'}
          </h3>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
            {searchQuery 
              ? 'Try adjusting your search or filters to find what you need.'
              : 'Create your first Memory Crystal to start building your legendary collection.'
            }
          </p>
          <button
            onClick={handleCreateCrystal}
            className="px-6 py-3 bg-gradient-to-r from-adhd-success to-broski-green text-white rounded-lg font-medium hover:scale-105 transition-all duration-200"
          >
            Create Your First Crystal
          </button>
        </div>
      )}

      {/* Crystal Grid/List */}
      {filteredCrystals.length > 0 && (
        <motion.div
          layout
          className={cn(
            'gap-6',
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              : 'space-y-4'
          )}
        >
          <AnimatePresence>
            {filteredCrystals.map((crystal, index) => (
              <motion.div
                key={crystal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05 // Staggered animation
                }}
              >
                <CrystalCard 
                  crystal={crystal} 
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Create Crystal Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateCrystalModal onClose={() => setShowCreateModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}