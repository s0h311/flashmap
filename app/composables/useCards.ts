import type { Card, Position } from '~/components/types'

export const useCards = () =>
  useState<(Card & Position)[]>('cards', () => [
    {
      x: 200,
      y: 200,
      title: 'Serotonin Hormone',
      color: 'sky',
    },
    {
      x: 0,
      y: 0,
      title: 'Dopamine',
      color: 'green',
    },
  ])
