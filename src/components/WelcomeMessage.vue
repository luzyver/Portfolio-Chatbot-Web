<template>
  <div class="welcome-message">
    <div class="welcome-icon"></div>
    <h2>Yo! Mau tau apa nih?</h2>
    <p>tanya-tanya soal gue aja, santai~</p>
    <div class="suggestion-chips">
      <button
        v-for="chip in chips"
        :key="chip.label"
        class="chip"
        @click="$emit('askQuestion', chip.question)"
      >
        {{ chip.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['askQuestion'])

const chips = [
  { label: 'Skill Programming', question: 'Apa saja skill programming yang kamu miliki?' },
  { label: 'Pengalaman Kerja', question: 'Ceritakan pengalaman kerja kamu' },
  { label: 'Proyek Portfolio', question: 'Proyek apa saja yang pernah kamu kerjakan?' },
  { label: 'Pendidikan', question: 'Apa latar belakang pendidikan kamu?' },
]
</script>
