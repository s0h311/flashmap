<template>
  <dialog
    ref="dialog"
    class="w-full rounded-lg p-5 tablet:w-2/3 desktop:w-1/2"
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

      <Editor
        v-model="content"
        :unstyled="false"
        editorStyle="height: 500px"
      />

      <button
        class="btn btn-primary btn-wide place-self-end"
        @click="handleSubmit"
      >
        Save
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type { Card } from './types'
import Editor from 'primevue/editor'

const emits = defineEmits<{
  submit: [card: Card]
}>()

defineExpose({
  showModal,
  close,
})

const dialog = ref<HTMLDialogElement>()

const title = ref<string>('')
const content = ref<string>('')

function showModal(): void {
  setTimeout(() => {
    dialog.value?.showModal()
  }, 100)
}

function close(): void {
  dialog.value?.close()

  title.value = ''
  content.value = ''
}

function handleSubmit(): void {
  if (!title.value) {
    // TODO handle error
    return
  }

  emits('submit', {
    title: title.value,
    content: content.value,
    color: 'purple',
  })

  close()
}
</script>

<style>
.p-editor-toolbar {
  border-radius: 0.5rem 0.5rem 0 0;
}

.p-editor-content {
  border-radius: 0 0 0.5rem 0.5rem;
}
</style>
