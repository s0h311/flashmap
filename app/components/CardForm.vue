<template>
  <dialog
    ref="dialog"
    class="rounded-lg p-5"
  >
    <div class="grid gap-7">
      <div class="flex items-center justify-between">
        <h3>Add new Flashcard</h3>

        <button @click="close">
          <IconX />
        </button>
      </div>

      <input
        class="input input-bordered"
        v-model="title"
        placeholder="Title"
        @keydown.enter="handleSubmit"
        autofocus
      />

      <button
        class="btn btn-primary"
        @click="handleSubmit"
      >
        submit
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type { Card } from './types'

const emits = defineEmits<{
  submit: [card: Card]
}>()

defineExpose({
  showModal,
  close,
})

const dialog = ref<HTMLDialogElement>()

const title = ref<string>('')

function showModal(): void {
  setTimeout(() => {
    dialog.value?.showModal()
  }, 100)
}

function close(): void {
  dialog.value?.close()

  title.value = ''
}

function handleSubmit(): void {
  emits('submit', {
    title: title.value,
    color: 'purple',
  })

  close()
}
</script>
