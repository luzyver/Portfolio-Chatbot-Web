<template>
  <div class="welcome-message">
    <div class="welcome-icon">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    </div>
    <h2>Halo, Ada yang bisa dibantu?</h2>
    <p>Tanyakan apa saja tentang portfolio saya</p>
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
