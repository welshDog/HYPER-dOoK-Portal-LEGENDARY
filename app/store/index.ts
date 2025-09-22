// ========================================
// HYPER dOoK Portal 2025 - State Management
// ========================================

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { 
  MemoryCrystal, 
  UserProfile, 
  UserPreferences,
  UserStats,
  Achievement,
  BroskiTransaction,
  CelebrationEvent
} from '../types'

// ========================================
// Crystal Store - Memory Crystal Management
// ========================================

interface CrystalStore {
  crystals: MemoryCrystal[]
  selectedCrystal: MemoryCrystal | null
  searchQuery: string
  filters: {
    categories: string[]
    priorities: string[]
    tags: string[]
  }

  // Actions
  addCrystal: (crystal: Omit<MemoryCrystal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCrystal: (id: string, updates: Partial<MemoryCrystal>) => void
  deleteCrystal: (id: string) => void
  selectCrystal: (crystal: MemoryCrystal | null) => void
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<CrystalStore['filters']>) => void
  getFilteredCrystals: () => MemoryCrystal[]
  celebrateCrystal: (id: string) => void
}

export const useCrystalStore = create<CrystalStore>()(
  devtools(
    persist(
      (set, get) => ({
        crystals: [
          {
            id: 'HYPER-CRYSTAL-WELCOME-001',
            title: '🚀 Welcome to Your HYPER dOoK Portal!',
            content: 'This is your first Memory Crystal! Use crystals to store ideas, tasks, projects, and anything important to your neurodivergent brain. Each crystal earns BROski$ points and can trigger celebrations!',
            category: {
              id: 'welcome',
              name: 'Welcome',
              color: '#8B5CF6',
              icon: '🎊',
              description: 'Getting started crystals',
              broskiMultiplier: 2.0
            },
            tags: ['welcome', 'tutorial', 'first-crystal'],
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: {
              level: 'high',
              color: '#F59E0B',
              points: 100
            },
            status: {
              type: 'new',
              label: 'Fresh Crystal',
              icon: '✨'
            },
            broskiPoints: 200,
            celebrationLevel: 1,
            isHyperfocused: false,
            aiEnhanced: true,
            position: { x: 0, y: 0, z: 0 }
          }
        ],
        selectedCrystal: null,
        searchQuery: '',
        filters: {
          categories: [],
          priorities: [],
          tags: []
        },

        addCrystal: (crystalData) => {
          const newCrystal: MemoryCrystal = {
            ...crystalData,
            id: `HYPER-CRYSTAL-${Date.now().toString(36).toUpperCase()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            broskiPoints: crystalData.broskiPoints || 50,
            celebrationLevel: 0,
            isHyperfocused: false,
            aiEnhanced: false
          }

          set((state) => ({
            crystals: [...state.crystals, newCrystal]
          }))

          // Trigger celebration
          get().celebrateCrystal(newCrystal.id)
        },

        updateCrystal: (id, updates) => {
          set((state) => ({
            crystals: state.crystals.map(crystal =>
              crystal.id === id 
                ? { ...crystal, ...updates, updatedAt: new Date() }
                : crystal
            )
          }))
        },

        deleteCrystal: (id) => {
          set((state) => ({
            crystals: state.crystals.filter(crystal => crystal.id !== id),
            selectedCrystal: state.selectedCrystal?.id === id ? null : state.selectedCrystal
          }))
        },

        selectCrystal: (crystal) => {
          set({ selectedCrystal: crystal })
        },

        setSearchQuery: (query) => {
          set({ searchQuery: query })
        },

        setFilters: (newFilters) => {
          set((state) => ({
            filters: { ...state.filters, ...newFilters }
          }))
        },

        getFilteredCrystals: () => {
          const { crystals, searchQuery, filters } = get()

          return crystals.filter(crystal => {
            // Search query filter
            if (searchQuery) {
              const query = searchQuery.toLowerCase()
              const searchableText = `${crystal.title} ${crystal.content} ${crystal.tags.join(' ')}`.toLowerCase()
              if (!searchableText.includes(query)) return false
            }

            // Category filter
            if (filters.categories.length > 0) {
              if (!filters.categories.includes(crystal.category.id)) return false
            }

            // Priority filter
            if (filters.priorities.length > 0) {
              if (!filters.priorities.includes(crystal.priority.level)) return false
            }

            // Tag filter
            if (filters.tags.length > 0) {
              if (!filters.tags.some(tag => crystal.tags.includes(tag))) return false
            }

            return true
          })
        },

        celebrateCrystal: (id) => {
          // This would trigger celebration animations
          const { updateCrystal } = get()
          updateCrystal(id, { 
            celebrationLevel: (get().crystals.find(c => c.id === id)?.celebrationLevel || 0) + 1
          })
        }
      }),
      {
        name: 'hyper-dook-crystals',
        partialize: (state) => ({
          crystals: state.crystals,
          filters: state.filters
        })
      }
    ),
    { name: 'Crystal Store' }
  )
)

// ========================================
// User Store - Profile & Preferences
// ========================================

interface UserStore {
  profile: UserProfile | null
  preferences: UserPreferences
  stats: UserStats
  broskiBalance: number
  achievements: Achievement[]
  transactions: BroskiTransaction[]

  // Actions
  updatePreferences: (prefs: Partial<UserPreferences>) => void
  updateStats: (stats: Partial<UserStats>) => void
  addBroskiPoints: (amount: number, source: string) => void
  spendBroskiPoints: (amount: number, description: string) => void
  unlockAchievement: (achievementId: string) => void
  triggerCelebration: (event: CelebrationEvent) => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        profile: {
          id: 'user-001',
          name: 'Chief Lyndz',
          avatar: '🦸‍♂️',
          preferences: {} as UserPreferences,
          stats: {} as UserStats,
          achievements: [],
          broskiBalance: 68000,
          hyperfocusStreak: 7,
          createdAt: new Date()
        },

        preferences: {
          // Accessibility
          fontFamily: 'lexend',
          fontSize: 'medium',
          highContrast: false,
          reducedMotion: false,
          dyslexicMode: false,

          // ADHD optimization
          hyperfocusMode: false,
          celebrationLevel: 'maximum',
          gamificationEnabled: true,
          soundEnabled: true,
          notificationsEnabled: true,

          // Visual
          theme: 'auto',
          colorScheme: 'broski-blue',
          backgroundPattern: true,

          // Productivity
          pomodoroLength: 25,
          breakLength: 5,
          dailyGoal: 5,
          weeklyGoal: 35
        },

        stats: {
          totalCrystals: 28,
          completedCrystals: 21,
          totalBroskiPoints: 68000,
          currentStreak: 7,
          longestStreak: 15,
          hyperfocusSessions: 42,
          celebrationsTriggered: 156,
          aiInteractions: 677,
          weeklyProgress: 85,
          monthlyProgress: 67
        },

        broskiBalance: 68000,

        achievements: [
          {
            id: 'crystal-creator',
            title: '💎 Crystal Creator',
            description: 'Created your first Memory Crystal',
            icon: '💎',
            rarity: 'common',
            broskiReward: 100,
            unlockedAt: new Date(),
            category: {
              id: 'creation',
              name: 'Creation',
              icon: '🎨',
              color: '#8B5CF6'
            }
          },
          {
            id: 'hyperfocus-hero',
            title: '⚡ Hyperfocus Hero',
            description: 'Completed 10 hyperfocus sessions',
            icon: '⚡',
            rarity: 'rare',
            broskiReward: 500,
            unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            category: {
              id: 'focus',
              name: 'Focus',
              icon: '🧠',
              color: '#00D4FF'
            }
          }
        ],

        transactions: [
          {
            id: 'tx-001',
            type: 'earned',
            amount: 200,
            description: 'Welcome crystal created!',
            source: 'crystal-creation',
            timestamp: new Date(),
            multiplier: 2.0
          }
        ],

        updatePreferences: (newPrefs) => {
          set((state) => ({
            preferences: { ...state.preferences, ...newPrefs }
          }))
        },

        updateStats: (newStats) => {
          set((state) => ({
            stats: { ...state.stats, ...newStats }
          }))
        },

        addBroskiPoints: (amount, source) => {
          const transaction: BroskiTransaction = {
            id: `tx-${Date.now()}`,
            type: 'earned',
            amount,
            description: `Earned from ${source}`,
            source,
            timestamp: new Date()
          }

          set((state) => ({
            broskiBalance: state.broskiBalance + amount,
            transactions: [...state.transactions, transaction]
          }))
        },

        spendBroskiPoints: (amount, description) => {
          const { broskiBalance } = get()

          if (broskiBalance >= amount) {
            const transaction: BroskiTransaction = {
              id: `tx-${Date.now()}`,
              type: 'spent',
              amount: -amount,
              description,
              source: 'user-action',
              timestamp: new Date()
            }

            set((state) => ({
              broskiBalance: state.broskiBalance - amount,
              transactions: [...state.transactions, transaction]
            }))
          }
        },

        unlockAchievement: (achievementId) => {
          // Would implement achievement unlock logic
        },

        triggerCelebration: (event) => {
          // Would trigger celebration system
        }
      }),
      {
        name: 'hyper-dook-user',
        partialize: (state) => ({
          preferences: state.preferences,
          stats: state.stats,
          broskiBalance: state.broskiBalance,
          achievements: state.achievements,
          transactions: state.transactions
        })
      }
    ),
    { name: 'User Store' }
  )
)

// ========================================
// UI Store - Interface State
// ========================================

interface UIStore {
  // Layout
  sidebarOpen: boolean
  hyperfocusMode: boolean
  currentView: string

  // Modals and overlays
  modalOpen: string | null
  celebrationActive: boolean
  toastMessages: Array<{
    id: string
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
    duration: number
  }>

  // 3D visualization
  is3DMode: boolean
  cameraPosition: { x: number; y: number; z: number }

  // Actions
  toggleSidebar: () => void
  toggleHyperfocus: () => void
  setCurrentView: (view: string) => void
  openModal: (modalId: string) => void
  closeModal: () => void
  showToast: (message: string, type: 'success' | 'info' | 'warning' | 'error', duration?: number) => void
  dismissToast: (id: string) => void
  toggle3DMode: () => void
  setCameraPosition: (position: { x: number; y: number; z: number }) => void
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      // Layout
      sidebarOpen: true,
      hyperfocusMode: false,
      currentView: 'dashboard',

      // Modals and overlays
      modalOpen: null,
      celebrationActive: false,
      toastMessages: [],

      // 3D visualization
      is3DMode: false,
      cameraPosition: { x: 0, y: 5, z: 10 },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }))
      },

      toggleHyperfocus: () => {
        set((state) => ({ hyperfocusMode: !state.hyperfocusMode }))
      },

      setCurrentView: (view) => {
        set({ currentView: view })
      },

      openModal: (modalId) => {
        set({ modalOpen: modalId })
      },

      closeModal: () => {
        set({ modalOpen: null })
      },

      showToast: (message, type, duration = 5000) => {
        const id = `toast-${Date.now()}`
        const toast = { id, message, type, duration }

        set((state) => ({
          toastMessages: [...state.toastMessages, toast]
        }))

        // Auto-dismiss toast
        setTimeout(() => {
          get().dismissToast(id)
        }, duration)
      },

      dismissToast: (id) => {
        set((state) => ({
          toastMessages: state.toastMessages.filter(toast => toast.id !== id)
        }))
      },

      toggle3DMode: () => {
        set((state) => ({ is3DMode: !state.is3DMode }))
      },

      setCameraPosition: (position) => {
        set({ cameraPosition: position })
      }
    }),
    { name: 'UI Store' }
  )
)

// ========================================
// Store Hooks & Selectors
// ========================================

// Crystal selectors
export const useFilteredCrystals = () => useCrystalStore((state) => state.getFilteredCrystals())
export const useCrystalCount = () => useCrystalStore((state) => state.crystals.length)
export const useSelectedCrystal = () => useCrystalStore((state) => state.selectedCrystal)

// User selectors
export const useBroskiBalance = () => useUserStore((state) => state.broskiBalance)
export const useUserStats = () => useUserStore((state) => state.stats)
export const useUserPreferences = () => useUserStore((state) => state.preferences)

// UI selectors
export const useCurrentView = () => useUIStore((state) => state.currentView)
export const useHyperfocusMode = () => useUIStore((state) => state.hyperfocusMode)
export const useToastMessages = () => useUIStore((state) => state.toastMessages)