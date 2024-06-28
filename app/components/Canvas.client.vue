<template>
  <div class="h-[100dvh] w-[100dvw] bg-slate-100">
    <Cards />

    <UIContextMenu
      v-if="showContextMenu"
      :x="contextMenuPosition.x"
      :y="contextMenuPosition.y"
      :items="contextMenuItems"
    />

    <CardForm
      ref="cardForm"
      @submit="addCard"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardForm } from '#build/components'
import type { ContextMenuItem, Shortcut } from './UI/ContextMenu.vue'
import type { Card } from './types'

onMounted(() => {
  initContextMenu()
  initShortcutEvents()
})

onBeforeUnmount(() => {
  removeShortcutEventListeners()
})

const cardForm = ref<InstanceType<typeof CardForm>>()

const cards = useCards()

const showContextMenu = ref<boolean>(false)

const shortcuts: Record<string, Shortcut> = {
  n: {
    shortcut: 'n',
    handleFn: openCardForm,
  },
}

const contextMenuItems: ContextMenuItem[] = [
  {
    name: 'New card',
    ...shortcuts.n,
  },
]

const contextMenuPosition = reactive({
  x: 0,
  y: 0,
})

function initContextMenu(): void {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    contextMenuPosition.x = e.clientX
    contextMenuPosition.y = e.clientY

    showContextMenu.value = true
  })

  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
}

function initShortcutEvents(): void {
  addEventListener('keydown', handleShortcuts)
}

function removeShortcutEventListeners(): void {
  removeEventListener('keydown', handleShortcuts)
}

function handleShortcuts(e: KeyboardEvent): void {
  const key = e.key

  const shortcut = shortcuts[key]

  if (!shortcut || !shortcut.handleFn) return

  shortcut.handleFn()
}

function openCardForm(): void {
  cardForm.value?.showModal()
}

function addCard(card: Card): void {
  cards.value.push({
    ...card,
    x: 0,
    y: 0,
  })
}
</script>
