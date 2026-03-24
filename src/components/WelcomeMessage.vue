<template>
  <div class="welcome-message">
    <div class="welcome-icon"></div>
    <h2>{{ content.title }}</h2>
    <p>{{ content.subtitle }}</p>
    <div class="suggestion-chips">
      <button
        v-for="chip in content.chips"
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
import { computed } from 'vue'

const props = defineProps({
  locale: {
    type: String,
    default: 'id',
  },
})

defineEmits(['askQuestion'])

const COPY = {
  id: {
    title: 'Yo! Mau tau apa nih?',
    subtitle: 'tanya-tanya soal Reziva Abelio Pratama aja, santai~',
    chips: [
      { label: 'Skill Programming', question: 'Apa saja skill programming yang dimiliki Reziva Abelio Pratama?' },
      { label: 'Pengalaman Kerja', question: 'Ceritakan pengalaman kerja Reziva Abelio Pratama' },
      { label: 'Proyek Portfolio', question: 'Proyek apa saja yang pernah dikerjakan Reziva Abelio Pratama?' },
      { label: 'Pendidikan', question: 'Apa latar belakang pendidikan Reziva Abelio Pratama?' },
    ],
  },
  en: {
    title: 'Yo! What do you want to know?',
    subtitle: 'ask anything about Reziva here, nice and easy~',
    chips: [
      { label: 'Programming Skills', question: 'What programming skills does Reziva Abelio Pratama have?' },
      { label: 'Work Experience', question: 'Tell me about Reziva Abelio Pratama work experience' },
      { label: 'Portfolio Projects', question: 'What projects has Reziva Abelio Pratama worked on?' },
      { label: 'Education', question: 'What is Reziva Abelio Pratama educational background?' },
    ],
  },
}

const content = computed(() => COPY[props.locale === 'en' ? 'en' : 'id'])
</script>
