<template>
  <header class="header">
    <div class="header-content">
      <div class="avatar">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      </div>
      <div class="header-info">
        <h1>Portfolio Assistant</h1>
        <span :class="['status', status]">
          <span class="status-dot"></span>
          <span class="status-text">{{ statusText }}</span>
        </span>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    default: 'warning',
  },
  statusText: {
    type: String,
    default: 'Mengecek koneksi...',
  },
})
</script>
