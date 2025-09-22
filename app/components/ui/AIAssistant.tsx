// ========================================
// AI Assistant - Floating Help & Motivation
// ========================================

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Brain, 
  Lightbulb,
  Heart,
  Zap
} from 'lucide-react'

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const suggestions = [
    '✨ How do I create my first crystal?',
    '🧠 Tips for hyperfocus mode?',
    '🎊 Customize my celebrations',
    '💎 Organize my crystal collection'
  ]

  const motivationalMessages = [
    "🚀 You're building an amazing crystal empire, BROski!",
    "⚡ Your ADHD superpower is showing - keep going!",
    "🎊 Every crystal is a celebration waiting to happen!",
    "💎 Your neurodivergent brain creates the most brilliant ideas!"
  ]

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-broski-purple to-broski-pink text-white rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <Brain className="w-8 h-8" />
      </motion.button>

      {/* Assistant Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
              className="fixed bottom-6 right-6 w-80 h-96 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-lg z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-broski-purple to-broski-pink flex items-center justify-center text-white">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                      AI BROski Assistant
                    </div>
                    <div className="text-xs text-adhd-success">
                      🟢 Ready to help!
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* Welcome Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-broski-purple to-broski-pink flex items-center justify-center text-white text-sm">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="bg-broski-purple/10 rounded-2xl p-3">
                      <p className="text-text-primary-light dark:text-text-primary-dark text-sm">
                        Hey there, crystal creator! 🎊 I'm here to help you maximize your ADHD superpowers. What can I assist you with today?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-adhd-success to-broski-green flex items-center justify-center text-white text-sm">
                    💡
                  </div>
                  <div className="flex-1">
                    <div className="bg-adhd-success/10 rounded-2xl p-3">
                      <p className="text-text-primary-light dark:text-text-primary-dark text-sm">
                        {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Suggestions */}
              <div className="p-4 border-t border-white/10">
                <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-2">
                  Quick suggestions:
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(suggestion)}
                      className="text-left text-xs p-2 bg-broski-blue/10 hover:bg-broski-blue/20 rounded-lg text-broski-blue transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 bg-white/50 dark:bg-gray-800/50 border border-white/20 rounded-lg text-sm focus:border-broski-purple focus:ring-2 focus:ring-broski-purple/20 focus:outline-none"
                  />
                  <button
                    disabled={!message.trim()}
                    className="p-2 bg-gradient-to-r from-broski-purple to-broski-pink text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}