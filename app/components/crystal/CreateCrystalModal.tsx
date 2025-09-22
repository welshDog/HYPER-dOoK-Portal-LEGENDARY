// ========================================
// Create Crystal Modal - ADHD-Friendly Crystal Creation
// ========================================

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  X, 
  Sparkles, 
  Brain, 
  Heart, 
  Zap, 
  Tag,
  Type,
  FileText,
  Star,
  Plus
} from 'lucide-react'
import { useCrystalStore, useUIStore } from '../../store'
import { generateCrystalId, cn } from '../../lib/utils'
import type { CrystalCategory, Priority } from '../../types'

interface CreateCrystalModalProps {
  onClose: () => void
}

export function CreateCrystalModal({ onClose }: CreateCrystalModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: null as CrystalCategory | null,
    priority: null as Priority | null,
    tags: [] as string[],
    newTag: ''
  })

  const { addCrystal } = useCrystalStore()
  const { showToast } = useUIStore()

  const categories: CrystalCategory[] = [
    {
      id: 'work',
      name: 'Work Magic',
      color: '#0EA5E9',
      icon: '⚡',
      description: 'Professional projects and tasks',
      broskiMultiplier: 1.5
    },
    {
      id: 'personal',
      name: 'Life Gems',
      color: '#EC4899',
      icon: '💎',
      description: 'Personal goals and experiences',
      broskiMultiplier: 1.2
    },
    {
      id: 'learning',
      name: 'Brain Food',
      color: '#22C55E',
      icon: '🧠',
      description: 'Knowledge and skill building',
      broskiMultiplier: 1.8
    },
    {
      id: 'creative',
      name: 'Art Spark',
      color: '#8B5CF6',
      icon: '🎨',
      description: 'Creative projects and ideas',
      broskiMultiplier: 2.0
    }
  ]

  const priorities: Priority[] = [
    {
      level: 'low',
      color: '#6B7280',
      points: 25
    },
    {
      level: 'medium',
      color: '#3B82F6',
      points: 50
    },
    {
      level: 'high',
      color: '#F59E0B',
      points: 100
    },
    {
      level: 'urgent',
      color: '#EF4444',
      points: 150
    },
    {
      level: 'legendary',
      color: '#8B5CF6',
      points: 300
    }
  ]

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.category || !formData.priority) {
      showToast('Please fill in all required fields!', 'warning')
      return
    }

    const basePoints = formData.priority.points * (formData.category.broskiMultiplier || 1)

    addCrystal({
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      tags: formData.tags,
      priority: formData.priority,
      status: {
        type: 'new',
        label: 'Fresh Crystal',
        icon: '✨'
      },
      broskiPoints: Math.round(basePoints),
      celebrationLevel: 0,
      isHyperfocused: false,
      aiEnhanced: false
    })

    showToast('🎊 LEGENDARY! New Memory Crystal created!', 'success')
    onClose()
  }

  const isStepComplete = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return formData.title.trim().length > 0
      case 2:
        return formData.category !== null
      case 3:
        return formData.priority !== null
      default:
        return true
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
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-broski-purple to-broski-pink p-6 text-white relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            data-close
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create Memory Crystal</h2>
              <p className="opacity-90">Transform your thoughts into legendary crystals</p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={cn(
                  'h-2 flex-1 rounded-full transition-colors',
                  stepNum <= step ? 'bg-white' : 'bg-white/30'
                )}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  <Type className="w-4 h-4 inline mr-2" />
                  Crystal Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's this crystal about?"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:border-broski-purple focus:ring-2 focus:ring-broski-purple/20 focus:outline-none text-text-primary-light dark:text-text-primary-dark"
                  maxLength={100}
                />
                <div className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                  {formData.title.length}/100 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Content & Details
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Describe your crystal in detail..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:border-broski-purple focus:ring-2 focus:ring-broski-purple/20 focus:outline-none text-text-primary-light dark:text-text-primary-dark resize-none"
                  maxLength={500}
                />
                <div className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                  {formData.content.length}/500 characters
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Category */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Choose a Crystal Category
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                  Each category has different BROski$ multipliers!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setFormData(prev => ({ ...prev, category }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      formData.category?.id === category.id
                        ? 'border-broski-purple bg-broski-purple/10'
                        : 'border-white/20 bg-white/30 hover:border-white/40'
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <div className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {category.name}
                        </div>
                        <div className="text-xs text-broski-purple font-bold">
                          {category.broskiMultiplier}x BROski$
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {category.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Priority */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Set Crystal Priority
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                  Higher priority = more BROski$ points!
                </p>
              </div>

              <div className="space-y-3">
                {priorities.map((priority) => (
                  <motion.button
                    key={priority.level}
                    onClick={() => setFormData(prev => ({ ...prev, priority }))}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between',
                      formData.priority?.level === priority.level
                        ? 'border-broski-purple bg-broski-purple/10'
                        : 'border-white/20 bg-white/30 hover:border-white/40'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: priority.color }}
                      />
                      <div className="font-semibold text-text-primary-light dark:text-text-primary-dark capitalize">
                        {priority.level}
                      </div>
                    </div>
                    <div className="text-broski-purple font-bold">
                      +{priority.points} BROski$
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Tags & Final */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Tags (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.newTag}
                    onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:border-broski-purple focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-broski-blue text-white rounded-lg hover:bg-broski-blue/80"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-broski-purple/20 text-broski-purple rounded-full text-sm flex items-center gap-2"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-broski-purple/30 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-broski-purple/10 to-broski-pink/10 rounded-xl p-4">
                <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Crystal Preview
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Title:</strong> {formData.title || 'Untitled Crystal'}
                  </div>
                  <div>
                    <strong>Category:</strong> {formData.category?.name} {formData.category?.icon}
                  </div>
                  <div>
                    <strong>Priority:</strong> {formData.priority?.level?.toUpperCase()}
                  </div>
                  <div>
                    <strong>Estimated BROski$:</strong> {
                      formData.category && formData.priority 
                        ? Math.round(formData.priority.points * formData.category.broskiMultiplier)
                        : 0
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
          <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Step {step} of 4
          </div>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-text-muted-light hover:text-text-primary-light transition-colors"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!isStepComplete(step)}
                className="px-6 py-3 bg-gradient-to-r from-broski-purple to-broski-pink text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-adhd-success to-broski-green text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Create Crystal!
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}