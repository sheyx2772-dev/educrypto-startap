// lib/game-data.ts

import type { GameLevel } from "@/types/blockchain-game";

export const LEVEL_SHORT_NAMES = ["Birinchi", "Zanjir", "Merkle"] as const;

export const LEVELS: GameLevel[] = [
  {
    id: 1,
    title: 'First Block',
    titleUz: 'Birinchi Blok',
    description: 'Arrange the fields of a genesis block correctly',
    descriptionUz: 'Genesis blok maydonlarini to\'g\'ri tartibga soling',
    concept: 'basic',
    hint: 'Genesis blok birinchi blok bo\'lib, Previous Hash = "0000...0000" bo\'ladi. Timestamp eng birinchi keladi!',
    reward: { xp: 18, usdt: 0.20 },
    blocks: [
      {
        id: 'b1',
        index: 0,
        title: 'Genesis Block',
        isGenesis: true,
        isComplete: false,
        concept: 'blockchain',
        conceptUz: 'Blokchain — bu zanjir. Har bir blok oldingi blokga bog\'langan.',
        fields: [
          {
            id: 'f1-1',
            type: 'timestamp',
            label: 'Timestamp',
            value: '2009-01-03 18:15:05',
            description: 'Blok yaratilgan vaqt',
            color: '#3B82F6',
            locked: false,
          },
          {
            id: 'f1-2',
            type: 'prev_hash',
            label: 'Previous Hash',
            value: '0000000000000000',
            description: 'Oldingi blok heshi (genesis = nol)',
            color: '#8B5CF6',
            locked: false,
          },
          {
            id: 'f1-3',
            type: 'transaction',
            label: 'Transactions',
            value: 'Satoshi → World: 50 BTC',
            description: 'Blok ichidagi tranzaksiyalar',
            color: '#10B981',
            locked: false,
          },
          {
            id: 'f1-4',
            type: 'nonce',
            label: 'Nonce',
            value: '2083236893',
            description: 'Mining uchun ishlatiladigan son',
            color: '#F59E0B',
            locked: false,
          },
          {
            id: 'f1-5',
            type: 'hash',
            label: 'Block Hash',
            value: '000000000019d668...',
            description: 'Bu blokning noyob identifikatori',
            color: '#EF4444',
            locked: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Chain Connection',
    titleUz: 'Zanjir Bog\'lanishi',
    description: 'Connect two blocks correctly — the hash must match!',
    descriptionUz: 'Ikki blokni to\'g\'ri bog\'lang — hash mos kelishi kerak!',
    concept: 'basic',
    hint: 'Ikkinchi blokning "Previous Hash" birinchi blokning "Block Hash" bilan bir xil bo\'lishi SHART. Bu zanjirning asosi!',
    reward: { xp: 25, usdt: 0.30 },
    blocks: [
      {
        id: 'b2',
        index: 0,
        title: 'Block #0',
        isGenesis: true,
        isComplete: true,
        concept: 'hash',
        conceptUz: 'Hash — ma\'lumotdan hosil qilingan noyob "barmoq izi". Hatto bitta belgi o\'zgarsa, hash butunlay o\'zgaradi.',
        fields: [
          {
            id: 'f2-1',
            type: 'timestamp',
            label: 'Timestamp',
            value: '2009-01-03 18:15:05',
            description: 'Blok vaqti',
            color: '#3B82F6',
            locked: true,
          },
          {
            id: 'f2-2',
            type: 'prev_hash',
            label: 'Previous Hash',
            value: '0000000000000000',
            description: 'Genesis blok',
            color: '#8B5CF6',
            locked: true,
          },
          {
            id: 'f2-3',
            type: 'transaction',
            label: 'Transactions',
            value: 'Satoshi → World: 50 BTC',
            description: 'Tranzaksiyalar',
            color: '#10B981',
            locked: true,
          },
          {
            id: 'f2-4',
            type: 'nonce',
            label: 'Nonce',
            value: '2083236893',
            description: 'Mining nonce',
            color: '#F59E0B',
            locked: true,
          },
          {
            id: 'f2-5',
            type: 'hash',
            label: 'Block Hash',
            value: '000000000019d668...',
            description: 'Bu blokning heshi',
            color: '#EF4444',
            locked: true,
          },
        ],
      },
      {
        id: 'b3',
        index: 1,
        title: 'Block #1',
        isGenesis: false,
        isComplete: false,
        concept: 'chain',
        conceptUz: 'Agar kimdir o\'tgan blokni o\'zgartirsa, uning heshi o\'zgaradi va zanjir uziladi — bu blockchainning xavfsizlik sirri!',
        fields: [
          {
            id: 'f3-1',
            type: 'timestamp',
            label: 'Timestamp',
            value: '2009-01-09 03:54:25',
            description: 'Blok vaqti',
            color: '#3B82F6',
            locked: false,
          },
          {
            id: 'f3-2',
            type: 'prev_hash',
            label: 'Previous Hash',
            value: '000000000019d668...',
            description: 'OLDINGI blok heshi bilan MOS kelishi shart!',
            color: '#8B5CF6',
            locked: false,
          },
          {
            id: 'f3-3',
            type: 'transaction',
            label: 'Transactions',
            value: 'Hal Finney: 10 BTC',
            description: 'Tranzaksiyalar',
            color: '#10B981',
            locked: false,
          },
          {
            id: 'f3-4',
            type: 'nonce',
            label: 'Nonce',
            value: '1639830024',
            description: 'Mining nonce',
            color: '#F59E0B',
            locked: false,
          },
          {
            id: 'f3-5',
            type: 'hash',
            label: 'Block Hash',
            value: '00000000d1145790...',
            description: 'Bu blokning heshi',
            color: '#EF4444',
            locked: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Merkle Tree',
    titleUz: 'Merkle Daraxti',
    description: 'Understand how transactions are grouped in a Merkle Tree',
    descriptionUz: 'Tranzaksiyalar Merkle Daraxtida qanday guruhlanishini tushuning',
    concept: 'merkle',
    hint: 'Merkle daraxtida har ikkita hash birlashtiriladi va yangi hash hosil bo\'ladi. Root — hammaning "umumiy imzosi".',
    reward: { xp: 30, usdt: 0.40 },
    blocks: [
      {
        id: 'b4',
        index: 0,
        title: 'Merkle Block',
        isGenesis: false,
        isComplete: false,
        concept: 'merkle',
        conceptUz: 'Merkle Root — barcha tranzaksiyalarning "xulasasi". Bitta tranzaksiya o\'zgарса, butun Root o\'zgaradi.',
        fields: [
          {
            id: 'f4-3',
            type: 'merkle_root',
            label: 'Merkle Root',
            value: 'a3f8d2c1e9b4...',
            description: 'Barcha TXlarning umumiy heshi',
            color: '#EC4899',
            locked: false,
          },
          {
            id: 'f4-1',
            type: 'transaction',
            label: 'TX 1: Jasur → Aziz',
            value: '0.5 USDT',
            description: 'Birinchi tranzaksiya',
            color: '#10B981',
            locked: false,
          },
          {
            id: 'f4-5',
            type: 'hash',
            label: 'Block Hash',
            value: '000000004eadcb9d...',
            description: 'Bu blokning heshi',
            color: '#EF4444',
            locked: false,
          },
          {
            id: 'f4-4',
            type: 'prev_hash',
            label: 'Previous Hash',
            value: '00000000d1145790...',
            description: 'Oldingi blok heshi',
            color: '#8B5CF6',
            locked: false,
          },
          {
            id: 'f4-2',
            type: 'transaction',
            label: 'TX 2: Malika → Bobur',
            value: '1.2 USDT',
            description: 'Ikkinchi tranzaksiya',
            color: '#10B981',
            locked: false,
          },
        ],
      },
    ],
  },
]

// To'g'ri tartib: timestamp → prev_hash → transaction(lar) → merkle_root? → nonce → hash
export const CORRECT_ORDER: Record<string, string[]> = {
  b1: ['f1-1', 'f1-2', 'f1-3', 'f1-4', 'f1-5'],
  b3: ['f3-1', 'f3-2', 'f3-3', 'f3-4', 'f3-5'],
  b4: ['f4-4', 'f4-1', 'f4-2', 'f4-3', 'f4-5'],
}

export const FIELD_ORDER_LOGIC: Record<string, number> = {
  timestamp: 1,
  prev_hash: 2,
  transaction: 3,
  merkle_root: 4,
  nonce: 5,
  hash: 6,
}

export function checkFieldOrder(fields: { type: string }[]): boolean {
  const orders = fields.map(f => FIELD_ORDER_LOGIC[f.type] ?? 99)
  for (let i = 0; i < orders.length - 1; i++) {
    if (orders[i] > orders[i + 1]) return false
  }
  return true
}

export function generateHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(16, '0').slice(0, 16) + '...'
}
