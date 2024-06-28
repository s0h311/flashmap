<template>
  <div
    ref="card"
    class="fixed max-w-[200px] cursor-pointer select-none hyphens-auto break-all rounded-lg px-6 py-2 text-center tracking-wide text-neutral shadow"
    :class="{
      'bg-red-200': color === 'red',
      'bg-green-200': color === 'green',
      'bg-blue-200': color === 'blue',
      'bg-sky-200': color === 'sky',
      'bg-gray-200': color === 'gray',
      'bg-zinc-200': color === 'zinc',
      'bg-amber-200': color === 'amber',
      'bg-purple-200': color === 'purple',
      'bg-pink-200': color === 'pink',
    }"
    @mousedown="(e: MouseEvent) => $emit('mouseDown', e)"
  >
    {{ title }}
  </div>
</template>

<script setup lang="ts">
import type { Card, Position } from './types'

const props = defineProps<Card & Position>()

const card = ref<HTMLDivElement>()

defineEmits<{
  mouseDown: [e: MouseEvent]
}>()

onMounted(() => {
  setInitialPosition(props.x, props.y)
})

watch(props, (newValue, _) => {
  updatePosition(newValue.x, newValue.y)
})

function updatePosition(x: number, y: number): void {
  card.value!.style.top = card.value!.offsetTop - y + 'px'
  card.value!.style.left = card.value!.offsetLeft - x + 'px'
}

function setInitialPosition(x: number, y: number): void {
  card.value!.style.top = y + 'px'
  card.value!.style.left = x + 'px'
}
</script>
