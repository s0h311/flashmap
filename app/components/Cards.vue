<template>
  <Card
    v-for="(card, index) in cards"
    :key="'card' + index"
    :x="card.x"
    :y="card.y"
    :title="card.title"
    :color="card.color"
    @mouse-down="(e: MouseEvent) => mouseDown(e, index)"
  />
</template>

<script setup lang="ts">
const cards = useCards()

let currentCard: number = 0
let startX: number = 0
let startY: number = 0

function mouseDown(event: MouseEvent, cardIndex: number): void {
  currentCard = cardIndex

  startX = event.clientX
  startY = event.clientY

  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e: MouseEvent): void {
  const newX = startX - e.clientX
  const newY = startY - e.clientY

  startX = e.clientX
  startY = e.clientY

  cards.value[currentCard]!.x = newX
  cards.value[currentCard]!.y = newY
}

function mouseUp(): void {
  document.removeEventListener('mousemove', mouseMove)
}
</script>
