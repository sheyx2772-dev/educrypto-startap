// types/blockchain.ts

export type BlockFieldType = 'hash' | 'nonce' | 'timestamp' | 'transaction' | 'prev_hash' | 'merkle_root'

export interface BlockField {
  id: string
  type: BlockFieldType
  label: string
  value: string
  description: string
  color: string
  locked: boolean // true = joy'i belgilangan, siljitib bo'lmaydi
}

export interface Block {
  id: string
  index: number
  title: string
  fields: BlockField[]
  isGenesis: boolean
  isComplete: boolean
  concept: string // o'qituvchi tushuntirish
  conceptUz: string
}

export interface GameLevel {
  id: number
  title: string
  titleUz: string
  description: string
  descriptionUz: string
  blocks: Block[]
  reward: { xp: number; usdt: number }
  hint: string
  concept: 'basic' | 'merkle' | 'consensus' | 'fork'
}

export interface GameState {
  currentLevel: number
  score: number
  xp: number
  usdt: number
  streak: number
  mistakes: number
  timeElapsed: number
  isComplete: boolean
  showHint: boolean
  activeField: string | null
  completedLevels: number[]
}

export type DragItem = {
  fieldId: string
  blockId: string
  fieldType: BlockFieldType
  value: string
  label: string
}
