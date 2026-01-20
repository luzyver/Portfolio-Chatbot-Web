<template>
  <div :class="['modal', { show: show }]" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Sumber Informasi</h3>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <div v-for="(source, index) in sources" :key="index" class="source-item">
          <p>{{ source.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  sources: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close'])

function handleEscape(e) {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>
