<template>
  <ul
    ref="contextMenu"
    class="absolute z-10 min-w-[160px] rounded bg-neutral p-1"
  >
    <button
      v-for="(item, index) in items"
      :key="'item' + index"
      class="flex w-full items-center justify-between rounded px-3 py-1 text-start text-sm text-neutral-content hover:bg-neutral-content hover:text-neutral"
      @click="(e) => (item.handleFn ? item.handleFn(e) : '')"
    >
      {{ item.name }}

      <p
        v-if="item.shortcut"
        class="font-mono text-xs"
      >
        {{ item.shortcut.toLocaleUpperCase() }}
      </p>
    </button>
  </ul>
</template>

<script setup lang="ts">
import type { Position } from '../types'

const contextMenu = ref<HTMLUListElement>()

export type Shortcut = {
  shortcut?: string
  handleFn?: (...args: any) => void
}

export type ContextMenuItem = {
  name: string
} & Shortcut

const props = defineProps<
  Position & {
    items: ContextMenuItem[]
  }
>()

onMounted(() => {
  contextMenu.value!.style.top = props.y + 'px'
  contextMenu.value!.style.left = props.x + 'px'
})
</script>
