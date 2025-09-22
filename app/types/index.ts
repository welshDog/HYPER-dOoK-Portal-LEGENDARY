// ========================================
// HYPER dOoK Portal 2025 - Type Definitions
// ========================================

export interface MemoryCrystal {
  id: string
  title: string
  content: string
  category: CrystalCategory
  tags: string[]
  createdAt: Date
  updatedAt: Date
  priority: Priority
  status: CrystalStatus
  broskiPoints: number
  celebrationLevel: number
  isHyperfocused: boolean
  aiEnhanced: boolean
  position?: {
    x: number
    y: number
    z: number
  }
}

export interface CrystalCategory {
  id: string
  name: string
  color: string
  icon: string
  description: string
  broskiMultiplier: number
}

export interface Priority {
  level: 'low' | 'medium' | 'high' | 'urgent' | 'legendary'
  color: string
  points: number
}

export interface CrystalStatus {
  type: 'new' | 'in-progress' | 'completed' | 'celebrated' | 'archived'
  label: string
  icon: string
}

// ========================================
// User Profile & ADHD Optimization
// ========================================

export interface UserProfile {
  id: string
  name: string
  avatar?: string
  preferences: UserPreferences
  stats: UserStats
  achievements: Achievement[]
  broskiBalance: number
  hyperfocusStreak: number
  createdAt: Date
}

export interface UserPreferences {
  // Accessibility preferences
  fontFamily: 'lexend' | 'opendyslexic' | 'system'
  fontSize: 'small' | 'medium' | 'large' | 'xl'
  highContrast: boolean
  reducedMotion: boolean
  dyslexicMode: boolean

  // ADHD optimization
  hyperfocusMode: boolean
  celebrationLevel: 'subtle' | 'moderate' | 'maximum'
  gamificationEnabled: boolean
  soundEnabled: boolean
  notificationsEnabled: boolean

  // Visual preferences  
  theme: 'light' | 'dark' | 'cream' | 'mint' | 'auto'
  colorScheme: string
  backgroundPattern: boolean

  // Productivity settings
  pomodoroLength: number
  breakLength: number
  dailyGoal: number
  weeklyGoal: number
}

export interface UserStats {
  totalCrystals: number
  completedCrystals: number
  totalBroskiPoints: number
  currentStreak: number
  longestStreak: number
  hyperfocusSessions: number
  celebrationsTriggered: number
  aiInteractions: number
  weeklyProgress: number
  monthlyProgress: number
}

// ========================================
// Gamification & Achievements
// ========================================

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  broskiReward: number
  unlockedAt?: Date
  progress?: {
    current: number
    target: number
  }
  category: AchievementCategory
}

export interface AchievementCategory {
  id: string
  name: string
  icon: string
  color: string
}

export interface BroskiTransaction {
  id: string
  type: 'earned' | 'spent' | 'bonus' | 'celebration'
  amount: number
  description: string
  source: string
  timestamp: Date
  multiplier?: number
}

export interface CelebrationEvent {
  id: string
  type: 'crystal-created' | 'crystal-completed' | 'streak-milestone' | 'achievement-unlocked'
  intensity: 'gentle' | 'moderate' | 'explosive'
  duration: number
  effects: CelebrationEffect[]
  triggerTimestamp: Date
}

export interface CelebrationEffect {
  type: 'confetti' | 'fireworks' | 'sparkles' | 'sound' | 'animation' | 'score-popup'
  config: Record<string, any>
  duration: number
}

// ========================================
// 3D Visualization & Spatial Memory
// ========================================

export interface Crystal3D extends MemoryCrystal {
  position: Vector3D
  rotation: Vector3D
  scale: Vector3D
  connections: string[]
  visualStyle: CrystalVisualStyle
  animationState: AnimationState
}

export interface Vector3D {
  x: number
  y: number
  z: number
}

export interface CrystalVisualStyle {
  geometry: 'sphere' | 'cube' | 'octahedron' | 'dodecahedron' | 'custom'
  material: 'glass' | 'crystal' | 'metal' | 'energy' | 'hologram'
  color: string
  opacity: number
  glow: boolean
  particle: boolean
  size: number
}

export interface AnimationState {
  isFloating: boolean
  isGlowing: boolean
  isPulsing: boolean
  rotationSpeed: number
  floatAmplitude: number
  connections: ConnectionAnimation[]
}

export interface ConnectionAnimation {
  targetId: string
  strength: number
  color: string
  animated: boolean
}

// ========================================
// AI Integration
// ========================================

export interface AIAgent {
  id: string
  name: string
  type: 'organizer' | 'enhancer' | 'motivator' | 'analyst' | 'assistant'
  status: 'active' | 'idle' | 'processing' | 'offline'
  capabilities: string[]
  personality: AIPersonality
  interactionCount: number
}

export interface AIPersonality {
  tone: 'encouraging' | 'professional' | 'casual' | 'broski' | 'gentle'
  helpStyle: 'direct' | 'suggestive' | 'collaborative' | 'coaching'
  celebrationStyle: 'subtle' | 'enthusiastic' | 'explosive'
}

export interface AIInteraction {
  id: string
  agentId: string
  type: 'suggestion' | 'organization' | 'enhancement' | 'analysis' | 'celebration'
  input: string
  output: string
  timestamp: Date
  feedback?: 'helpful' | 'neutral' | 'unhelpful'
  broskiPointsEarned: number
}

// ========================================
// Dashboard & Analytics
// ========================================

export interface DashboardWidget {
  id: string
  type: 'stats' | 'progress' | 'achievements' | 'crystals' | 'ai' | '3d-view' | 'calendar'
  title: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  config: Record<string, any>
  visible: boolean
  order: number
}

export interface ProgressMetrics {
  daily: {
    crystalsCreated: number
    crystalsCompleted: number
    broskiPointsEarned: number
    hyperfocusMinutes: number
    celebrationsTriggered: number
  }
  weekly: {
    totalCrystals: number
    completionRate: number
    averageSessionLength: number
    streakDays: number
    productivityScore: number
  }
  monthly: {
    crystalGrowth: number
    skillProgress: Record<string, number>
    achievementCount: number
    communityRanking: number
  }
}

// ========================================
// Navigation & UI State
// ========================================

export interface NavigationState {
  currentView: ViewType
  previousView?: ViewType
  breadcrumb: string[]
  isHyperfocusMode: boolean
  sidebarOpen: boolean
  searchQuery: string
  filters: FilterState
}

export interface ViewType {
  id: string
  name: string
  icon: string
  path: string
  requires3D: boolean
  accessibilityFeatures: string[]
}

export interface FilterState {
  categories: string[]
  priorities: string[]
  statuses: string[]
  tags: string[]
  dateRange: {
    start?: Date
    end?: Date
  }
  searchTerms: string[]
  aiEnhanced: boolean | null
}

// ========================================
// Accessibility & Support
// ========================================

export interface AccessibilityFeature {
  id: string
  name: string
  description: string
  category: 'visual' | 'motor' | 'cognitive' | 'auditory'
  enabled: boolean
  config: Record<string, any>
  priority: number
}

export interface SupportTicket {
  id: string
  type: 'bug' | 'feature-request' | 'accessibility' | 'performance' | 'general'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

// ========================================
// API & Data Management  
// ========================================

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  metadata?: {
    timestamp: Date
    version: string
    requestId: string
  }
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export interface SearchResult<T> {
  items: T[]
  total: number
  query: string
  filters: FilterState
  suggestions: string[]
  facets: Record<string, number>
}

// ========================================
// Event System
// ========================================

export interface AppEvent {
  type: string
  payload: any
  timestamp: Date
  source: string
  userId?: string
}

export interface CelebrationTrigger {
  event: AppEvent
  condition: (event: AppEvent) => boolean
  celebration: CelebrationEvent
  priority: number
}

// ========================================
// Utility Types
// ========================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type EventCallback<T = any> = (data: T) => void | Promise<void>

export type ComponentProps<T = {}> = T & {
  className?: string
  children?: React.ReactNode
  'data-testid'?: string
}