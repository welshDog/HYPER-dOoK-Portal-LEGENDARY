// ========================================
// Toast Container - ADHD-Friendly Notifications
// ========================================

'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react'
import { useUIStore } from '../../store'
import { cn } from '../../lib/utils'

export function ToastContainer() {
  const { toastMessages, dismissToast } = useUIStore()

  const iconMap = {
    success: CheckCircle,
    info: Info,
    warning: AlertTriangle,
    error: XCircle,
  }

  const colorMap = {
    success: 'from-adhd-success/90 to-broski-green/90 text-white',
    info: 'from-broski-blue/90 to-adhd-focus/90 text-white',
    warning: 'from-adhd-warning/90 to-broski-orange/90 text-black',
    error: 'from-adhd-error/90 to-red-600/90 text-white',
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toastMessages.map((toast) => {
          const Icon = iconMap[toast.type]

          return (
            <motion.div
              key={toast.id}
              initial={{ x: 300, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 300, opacity: 0, scale: 0.9 }}
              className={cn(
                'relative rounded-xl p-4 shadow-lg backdrop-blur-sm',
                'bg-gradient-to-r border border-white/20',
                colorMap[toast.type],
                'min-h-[4rem] flex items-center gap-3'
              )}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <p className="font-medium flex-1 text-sm leading-relaxed">
                {toast.message}
              </p>
              <button
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}