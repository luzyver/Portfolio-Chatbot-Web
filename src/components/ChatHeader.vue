<template>
  <header class="header">
    <div class="header-content">
      <div class="avatar">LZV</div>
      <div class="header-info">
        <h1>luzyver.dev</h1>
        <span :class="['status', status]">
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
